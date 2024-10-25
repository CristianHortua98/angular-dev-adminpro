import { Pipe, PipeTransform } from '@angular/core';
import { environments } from '../../../environments/environments';

@Pipe({
  name: 'userImage'
})
export class UserImagePipe implements PipeTransform {

  baseUrl = environments.baseUrl;

  transform(img: string): string {

    if(img){

      return `${this.baseUrl}/upload/users/${img}`;

    }else{

      return `${this.baseUrl}/upload/users/no-image.png`;

    }

  }

}
