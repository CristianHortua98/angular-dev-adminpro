import { Pipe, PipeTransform } from '@angular/core';
import { environments } from '../../../environments/environments';

@Pipe({
  name: 'imageView'
})
export class ImageViewPipe implements PipeTransform {

  baseUrl = environments.baseUrl;

  transform(img: string, type: 'users'|'hospitals'|'doctors'): string {

    if(img){

      return `${this.baseUrl}/upload/${type}/${img}`;

    }else{

      return `${this.baseUrl}/upload/${type}/no-image.png`;

    }

  }

}
