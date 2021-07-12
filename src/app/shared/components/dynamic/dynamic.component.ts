import { 
  Component, 
  AfterViewInit, 
  ComponentFactoryResolver, 
  ComponentRef, 
  ViewChild, 
  ViewContainerRef, 
  ElementRef, 
  Input 
} from '@angular/core';

import * as List from '@shared/components/icons';

@Component({
  selector: 'app-dynamic',
  template: '<ng-template #target></ng-template>',
})
export class DynamicComponent implements AfterViewInit {
  private readonly listIcons: any = List
  @ViewChild('target', { read: ViewContainerRef }) target!:ViewContainerRef;
  @Input() type:string = '';
  cmpRef!: ComponentRef<any>;
  
  constructor(
    private readonly resolver: ComponentFactoryResolver
  ) { }

  ngAfterViewInit(): void {
    this.updateComponent()
  }

  private updateComponent(): void {
    const childComponent = this.listIcons[this.type]
    if(childComponent) {
      const childComponentResolved = this.resolver.resolveComponentFactory(childComponent);
      this.target.createComponent(childComponentResolved);
    }
  }

}
