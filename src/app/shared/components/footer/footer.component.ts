import { Component, OnInit } from '@angular/core';
import { WOLOX_WEBSITE } from '@shared/constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public readonly WOLOX_WEBSITE:string = WOLOX_WEBSITE
}
