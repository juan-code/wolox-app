import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';

import { AuthGuard, NoAuthGuard } from '@shared/guards';
import { ROOT, SIGNINUP_ROUTES, POKEMON_ROUTES } from '@shared/constants';

const routes: Routes = [
  {
    path: ROOT.main,
    loadChildren: () => import('@landing/landing.module').then(m => m.LandingModule),
  },
  {
    path: SIGNINUP_ROUTES.main,
    canLoad: [
      NoAuthGuard,
    ],
    loadChildren: () => import('@sign/sign.module').then(m => m.SignModule)
  },
  {
    path: POKEMON_ROUTES.main,
    canLoad: [
      AuthGuard
    ],
    loadChildren: () => import('@pokedex/pokedex.module').then(m => m.PokedexModule)
  }
];

const configExtraOptionsRouter: ExtraOptions = {
  anchorScrolling: 'disabled'
}
@NgModule({
  imports: [RouterModule.forRoot(routes, configExtraOptionsRouter)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
