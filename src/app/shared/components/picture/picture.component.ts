import { Component, Input } from '@angular/core';

import { MEDIA_DESKTOP_SIZE, MEDIA_TABLE_SIZE } from '@shared/constants';
import { buildImageHero } from '@shared/utils'

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
})
export class PictureComponent {
  @Input() alt:string = '';
  @Input() nameImage: string = '';

  public readonly TABLE_SIZE: string = MEDIA_TABLE_SIZE;
  public readonly DESKTOP_SIZE: string = MEDIA_DESKTOP_SIZE;

  get IMAGE3X(): string {
    return buildImageHero(this.nameImage, '2');
  }
  get IMAGE2X(): string {
    return buildImageHero(this.nameImage, '3');
  }
  get IMAGE(): string {
    return buildImageHero(this.nameImage);
  }

}