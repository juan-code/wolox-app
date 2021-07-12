import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//internationalization i18n
import { I18nModule } from '@app/i18n/i18n.module';

import { 
  NavbarComponent, 
  WoloxLogoComponent,
  PictureComponent,
  DynamicComponent,
  FooterComponent,
  AnchorTargetComponent,
  SelectLanguageComponent,
} from './components';
import {
  TimeComponent,
  HomeOfficeComponent,
  WorkshopComponent,
  SnacksComponent,
  RemoteComponent,
  BrainComponent,
} from './components/icons';

const components = [
  NavbarComponent,
  WoloxLogoComponent,
  PictureComponent,
  FooterComponent,
  DynamicComponent,
  AnchorTargetComponent,
  SelectLanguageComponent,
  //icons
  TimeComponent,
  HomeOfficeComponent,
  WorkshopComponent,
  SnacksComponent,
  RemoteComponent,
  BrainComponent,
]

@NgModule({
  declarations: [
    ...components,
  ],
  exports: [
    ...components,
  ],
  imports: [
    I18nModule.forChild(),
    CommonModule,
  ],
})
export class SharedModule {}
