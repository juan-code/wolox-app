import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ListPokemons, PaginationPokemon, PaginationPokemonService, PokemonItem, SearchPokemonService, SelectionPokemonService } from '@pokedex/services';
import { PAGINATION_SIZES } from '@pokedex/constants';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  public readonly itemsPagination = PAGINATION_SIZES;
  public listPokemons!:ListPokemons;
  public listPokemonsSelected:PokemonItem[] = [];
  public pokemonSearched!:PokemonItem | undefined;
  private allPages:PaginationPokemon = this.paginationService.getAllPages();
  private readonly subscriptions:Subscription[] = [];
  constructor(
    private readonly route: ActivatedRoute,
    private readonly selectionPokemon: SelectionPokemonService,
    private readonly paginationService: PaginationPokemonService,
    private readonly searchPokemonService: SearchPokemonService,
  ) { }

  ngOnInit(): void {
    this.listPokemons = this.route.snapshot.data.pokemons;
    this.paginationService.start(this.listPokemons);
    this.listenChangePage();
    this.listenListSelection();
    this.listenPages();
    this.listenSearchPokemon();
  }

  ngOnDestroy() {
    for(let subscribtion of this.subscriptions) {
      subscribtion.unsubscribe();
    }
  }

  public get getListPokemons():PokemonItem[] {
    return this.pokemonSearched ? [this.pokemonSearched] : (this.listPokemons?.results || [])
  }

  private listenListSelection() {
    this.subscriptions.push(this.selectionPokemon.listPokemonsListener().subscribe((pokemons) => {
        this.listPokemonsSelected = pokemons;
      }
    ));
  }

  private listenChangePage(): void {
    const subscription:Subscription = this.paginationService.listenCurrentPage().subscribe(page => {
      this.listPokemons = this.allPages[page];
    })
    this.subscriptions.push(subscription)
  }

  private listenPages(): void {
    const subscription:Subscription = this.paginationService.listenPages().subscribe(pages => {
      this.allPages = pages;
    });
    this.subscriptions.push(subscription)
  }

  private listenSearchPokemon(): void {
    const subscription:Subscription = this.searchPokemonService
    .listenSearch()
    .subscribe((pokemon) => {
      if(pokemon && !('error' in pokemon)) {
        this.pokemonSearched = pokemon;
      }
    });
    this.subscriptions.push(subscription);
  }

  public changeSize(size:string) {
    const sizePerPage = Number(size);
    this.selectionPokemon.resetSelection();
    this.paginationService.changeLimit(sizePerPage)
  }

  public cleanFilter() {
    this.pokemonSearched = undefined;
    this.searchPokemonService.clearSearch();
  }

}
