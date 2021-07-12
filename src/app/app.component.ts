import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { DEFAULT_LANG, LANGUAGES } from '@shared/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public readonly translateService: TranslateService
  ) {
    this.translateService.setDefaultLang(DEFAULT_LANG);
    this.translateService.use(LANGUAGES.es);
  }
}
