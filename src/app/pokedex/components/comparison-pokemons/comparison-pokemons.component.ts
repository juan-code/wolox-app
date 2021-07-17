import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs'

import { Pokemon, PokemonItem, PokemonService, SelectionPokemonService } from '@app/pokedex/services';

@Component({
  selector: 'app-comparison-pokemons',
  templateUrl: './comparison-pokemons.component.html',
  styleUrls: ['./comparison-pokemons.component.scss']
})
export class ComparisonPokemonsComponent implements OnInit, OnDestroy {

  public pokemons:Pokemon[] = [];
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly selectionPokemonService: SelectionPokemonService 
  ) { }

  ngOnInit(): void {
    this.getAllDescriptionPokemons();
  }

  ngOnDestroy() {
    for(let pokemon of this.pokemons) {
      this.selectionPokemonService.delete(pokemon.id);
    }
  }

  private getAllDescriptionPokemons() {
    const listRequest:Observable<Pokemon>[] = this.selectionPokemonService
    .geListPokemon()
    .map((pokemon:PokemonItem) => {
      return this.pokemonService.getPokemonByIdOrName(pokemon.id);
    });
    forkJoin(listRequest).subscribe((pokemons:Pokemon[]) => {
      this.pokemons = pokemons;
    });
  }

}
