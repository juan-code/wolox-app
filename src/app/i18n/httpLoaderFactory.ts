import { Provider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

const PATH_LOCALES:string = './assets/i18n'

export function HttpLoaderFactory(http:HttpClient): MultiTranslateHttpLoader {
  return new MultiTranslateHttpLoader(http, [
    { prefix: `${PATH_LOCALES}/landing/`, suffix: ".json" },
    { prefix: `${PATH_LOCALES}/shared/`, suffix: ".json" },
  ]);
}

export function getConfigHttpLoader():Provider {
  return {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient]
  }
} 