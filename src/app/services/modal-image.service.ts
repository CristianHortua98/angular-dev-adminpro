import { EventEmitter, Injectable } from '@angular/core';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  baseUrl = environments.baseUrl;

  private _hiddenModal: boolean = true;
  public type: 'users'|'hospitals'|'doctors';
  public id: number;
  public img: string;

  //EMITIMOS UN VALOR A OTROS COMPONENTES CUANDO CAMBIA LA IMG
  public newImg: EventEmitter<string> = new EventEmitter<string>()

  constructor(){}

  get hiddenModal(){
    return this._hiddenModal;
  }

  openModal(type: 'users'|'hospitals'|'doctors', id: number, img: string){
    
    this._hiddenModal = false;
    this.type = type;
    this.id = id;
    // this.img = img;

    if(!img || img === ''){
      img = 'no-image.png';
    }

    this.img = `${this.baseUrl}/upload/${type}/${img}`;

  }

  closeModal(){
    this._hiddenModal = true;
  }

}
