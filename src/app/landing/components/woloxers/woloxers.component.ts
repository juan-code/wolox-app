import { Component } from '@angular/core';
import { WOLOX_TWITTER } from '@shared/constants';

@Component({
  selector: 'app-woloxers',
  templateUrl:'./woloxers.component.html',
  styleUrls: ['./woloxers.component.scss']
})
export class WoloxersComponent {
  public readonly LINK_TWITTER:string = WOLOX_TWITTER
}