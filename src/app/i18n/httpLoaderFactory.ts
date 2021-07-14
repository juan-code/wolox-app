import { Provider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

const PATH_LOCALES:string = './assets/i18n';
const EXTENTION:string = ".json" 

export function HttpLoaderFactory(http:HttpClient): MultiTranslateHttpLoader {
  return new MultiTranslateHttpLoader(http, [
    { prefix: `${PATH_LOCALES}/landing/`, suffix: EXTENTION },
    { prefix: `${PATH_LOCALES}/shared/`,  suffix: EXTENTION },
    { prefix: `${PATH_LOCALES}/sign/`,  suffix: EXTENTION },

  ]);
}

export function getConfigHttpLoader():Provider {
  return {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient]
  }
} 