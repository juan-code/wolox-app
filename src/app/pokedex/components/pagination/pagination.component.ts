import { Component, OnInit, OnDestroy } from '@angular/core';
import { DEAFULT_SIZE_PAGINATION } from '@app/pokedex/constants';
import { ListPokemons, PaginationPokemonService, PokemonService } from '@app/pokedex/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss', '../../style.shared.scss']
})
export class PaginationComponent implements OnInit, OnDestroy {
  public isLoading:boolean = false;
  private readonly subscriptions:Subscription[] = []
  constructor(
    private readonly paginationPokemonService: PaginationPokemonService,
    private readonly pokemonService: PokemonService,
  ) { }

  ngOnInit(): void {
    this.listenLoadingPokemon();
  }

  ngOnDestroy() {
    for(let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  get canPrev(): boolean {
    const prev = !this.getCurrentListPokemon()?.previous
    return prev;
  }

  get canNext(): boolean {
    const next = !this.getCurrentListPokemon()?.next
      return next;
  }

  private listenLoadingPokemon() {
    const subscription = this.pokemonService.isLoadingPokemons().subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    this.subscriptions.push(subscription);
  }

  private getCurrentListPokemon(): ListPokemons {
    return this.paginationPokemonService.getCurrentListPokemon();
  }

  private getPage(): number {
    return this.paginationPokemonService.getCurrentPage()
  }

  public next():void {
    const nextPage = this.getPage() + 1;
    this.paginationPokemonService.getPokemons(nextPage).subscribe();
  }

  public prev(): void {
    const prevPage = this.getPage() - 1;
    if(prevPage >= 0) {
      this.paginationPokemonService.getPokemons(prevPage).subscribe();
    }
  }
}
