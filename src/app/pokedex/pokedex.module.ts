import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';
import { I18nModule } from '@app/i18n/i18n.module';
import { 
  PokemonService, 
  PaginationPokemonService, 
  SelectionPokemonService,
  SearchPokemonService,
} from '@pokedex/services';

import { PokedexRoutingModule } from '@pokedex/pokedex-routing.module';

import {
  ComparePokemonsGuard
} from '@pokedex/guards';

import { 
  ListPokemonComponent, 
  PaginationComponent, 
  PokeballComponent,
  PokemonSelectedComponent,
  SearchComponent,
  CardPokemonComponent,
} from '@pokedex/components';

import { InterceptorPokedexModule } from '@pokedex/interceptors';

@NgModule({
  declarations: [
    ...PokedexRoutingModule.components,
    ListPokemonComponent,
    PaginationComponent,
    PokeballComponent,
    PokemonSelectedComponent,
    SearchComponent,
    CardPokemonComponent,
  ],
  providers: [
    PokemonService,
    PaginationPokemonService,
    SelectionPokemonService,
    ComparePokemonsGuard,
    SearchPokemonService,
  ],
  imports: [
    InterceptorPokedexModule,
    FormsModule, ReactiveFormsModule,
    CommonModule,
    PokedexRoutingModule,
    SharedModule,
    I18nModule.forChild(),
  ],
})
export class PokedexModule { }
