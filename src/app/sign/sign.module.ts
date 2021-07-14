import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';

import { I18nModule } from '@app/i18n/i18n.module';

import { SignRoutingModule } from './sign-routing.module';

//Services
import {
  CountryService,
  SessionService,
} from './services';

//Components
import {
  SignUpComponent,
  SignInComponent,
  ListCountriesComponent
} from './components';

@NgModule({
  declarations: [
    ...SignRoutingModule.components,
    SignUpComponent,
    SignInComponent,
    ListCountriesComponent
  ],
  providers: [
    CountryService,
    SessionService,
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    SignRoutingModule,
    I18nModule.forChild(),
    SharedModule,
  ]
})
export class SignModule { }
