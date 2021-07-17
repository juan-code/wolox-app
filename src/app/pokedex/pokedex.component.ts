import { ChangeDetectionStrategy } from '@angular/compiler/src/compiler_facade_interface';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LOGO_POKEMON_URL } from './constants';
import { PokemonService } from './services';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss', './style.shared.scss']
})
export class PokedexComponent implements OnInit {
  public isLoadingPokemon:boolean = false;
  public readonly logoUrl:string = LOGO_POKEMON_URL;
  private readonly subscriptions:Subscription = new Subscription();
  constructor(
    private readonly pokemonService:PokemonService,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.listenLoading();
  }

  private listenLoading() {
    const subscription:Subscription = this.pokemonService.isLoadingPokemons().subscribe(isLoading => {
      this.isLoadingPokemon = isLoading;
      this.cd.detectChanges();
    });
    this.subscriptions.add(subscription);
  }
}
