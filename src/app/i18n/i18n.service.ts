import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { LANGUAGES_VALUES, NAME_LANGUAGES } from '@shared/constants';

export type ListLangs = {
  [x: string]: string
}
@Injectable({
  providedIn:'root'
})
export class I18nService {
  constructor(
    private readonly translateService: TranslateService,
  ) {
    this.translateService.addLangs(LANGUAGES_VALUES)
  }

  public useLang(lang:string): Observable<any> {
    return this.translateService.use(lang)
  }

  public languageSelected() {
    return this.translateService
  }

  public listLanguages(): Array<string> {
    return LANGUAGES_VALUES
  }

  public defaultLang(): string {
    return this.translateService.defaultLang
  }
  public nameLanguages(): ListLangs {
    return NAME_LANGUAGES
  }
}