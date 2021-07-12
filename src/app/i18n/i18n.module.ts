import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

//internationalization i18n
import { TranslateModule } from '@ngx-translate/core';

import { DEFAULT_LANG } from '@shared/constants';

import { getConfigHttpLoader } from './httpLoaderFactory';


@NgModule({
  imports: [ 
    HttpClientModule,
    TranslateModule.forRoot({
      loader: getConfigHttpLoader(),
      defaultLanguage: DEFAULT_LANG,
      useDefaultLang: true,
    })
  ]
})
export class I18nModule {
  public static forChild(configHttpLoader?: Provider): ModuleWithProviders<TranslateModule> {
    return TranslateModule.forChild({
      loader: configHttpLoader ? configHttpLoader : getConfigHttpLoader(),
      extend: true
    })
  }
}
