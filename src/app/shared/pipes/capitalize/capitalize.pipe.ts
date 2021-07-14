import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
@Injectable({
  providedIn: 'root'
})
export class CapitalizePipe implements PipeTransform {

  transform(text: string): string {
    if(!text && text?.length <= 1) {
      return text
    }
    return `${text[0].toUpperCase()}${text.slice(1)}`;
  }

}
