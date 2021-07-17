import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { PokemonItem, SelectionPokemonService } from '@pokedex/services';

@Component({
  selector: 'app-pokemon-selected',
  templateUrl: './pokemon-selected.component.html',
  styleUrls: ['./pokemon-selected.component.scss']
})
export class PokemonSelectedComponent implements OnInit, OnDestroy {

  private listPokemonItem:PokemonItem[] = this.selectionPokemonService.geListPokemon();
  private readonly subscription:Subscription = new Subscription();
  constructor(
    private readonly selectionPokemonService:SelectionPokemonService,
  ) { }

  ngOnInit(): void {
    this.listenSelectedPokemons();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get listPokemons(): PokemonItem[] {
    return this.listPokemonItem;
  }

  private listenSelectedPokemons():void {
    const subscription = this.selectionPokemonService.listPokemonsListener().subscribe((pokemones) => {
      this.listPokemonItem = pokemones;
    })
    this.subscription.add(subscription);
  }

  public removePokemon(pokemon:PokemonItem) {
    this.selectionPokemonService.delete(pokemon.id);
  }

}
