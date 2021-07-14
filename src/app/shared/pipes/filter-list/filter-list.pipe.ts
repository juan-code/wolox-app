import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filterList'
})
@Injectable({
  providedIn: 'root'
})
export class FilterListPipe implements PipeTransform {

  transform(items: any[], fn:(item:any, criteria:string) => boolean, criteria:string): any {
    if(!items || !fn) {
      return items
    }
    return items.filter((item:any) => fn(item, criteria));
  }

}
