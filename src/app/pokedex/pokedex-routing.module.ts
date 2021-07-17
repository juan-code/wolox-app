import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PokemonService } from '@pokedex/services';
import { PokedexComponent } from '@pokedex/pokedex.component';
import { ComparisonPokemonsComponent, MainComponent } from '@pokedex/components';

import {
  ComparePokemonsGuard,
} from '@pokedex/guards';

import { POKEMON_ROUTES } from '@shared/constants';

const routes: Routes = [
  {
    path: '',
    resolve: {
      pokemons:PokemonService
    },
    component: PokedexComponent,
    children: [
      {
        path: '',
        component: MainComponent,
      },
      {
        path: POKEMON_ROUTES.childrend.compare,
        component: ComparisonPokemonsComponent,
        canActivate: [
          ComparePokemonsGuard,
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokedexRoutingModule {
  static components:any[] = [
    PokedexComponent,
    ComparisonPokemonsComponent,
    MainComponent,
  ]
}
