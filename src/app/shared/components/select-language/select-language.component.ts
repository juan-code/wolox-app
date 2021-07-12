import { Component } from '@angular/core';
import { I18nService, ListLangs } from '@app/i18n/i18n.service';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss']
})
export class SelectLanguageComponent {
  public nameLanguages!:ListLangs;
  constructor(
    public readonly i18nService: I18nService,
  ) { 
    this.nameLanguages = this.i18nService.nameLanguages()
  }
  
  public trackLanguageName(_:number, item:string) {
    return item
  }
}
