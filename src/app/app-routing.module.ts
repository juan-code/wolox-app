import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@landing/landing.module').then(m => m.LandingModule),
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
