import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-anchor-target',
  templateUrl: './anchor-target.component.html',
})
export class AnchorTargetComponent {
  @Input() target:string = '_blank';
  @Input() href:string = '';
}
