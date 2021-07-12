import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { LandingComponent } from '@landing/landing.component';

const routes: Routes = [
  {
    path:'',
    component: LandingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule {
  static components = [LandingComponent] 
}
