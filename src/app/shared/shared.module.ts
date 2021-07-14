import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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

import { FilterListPipe, CapitalizePipe } from './pipes';

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

const pipes = [
  FilterListPipe,
  CapitalizePipe,
];

@NgModule({
  declarations: [
    ...components,
    ...pipes,
  ],
  exports: [
    ...components,
    ...pipes
  ],
  imports: [
    CommonModule,
    RouterModule,
    I18nModule.forChild(),
  ],
})
export class SharedModule {}
