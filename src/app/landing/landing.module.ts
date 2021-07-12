import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//routing
import { LandingRoutingModule } from '@landing/landing-routing.module';
//Components
import { 
  HeroComponent, 
  BgHeaderComponent,
  WoloxersComponent,
  WorkUsComponent,
  BenefitsComponent,
} from '@landing/components';
//Shared module
import { SharedModule } from '@shared/shared.module';
import { I18nModule } from '@app/i18n/i18n.module';
@NgModule({
  declarations: [
    ...LandingRoutingModule.components,
    HeroComponent,
    BgHeaderComponent,
    WoloxersComponent,
    WorkUsComponent,
    BenefitsComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    SharedModule,
    I18nModule.forChild(),
  ]
})
export class LandingModule { }
