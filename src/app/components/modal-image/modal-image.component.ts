import { Component } from '@angular/core';
import { ModalImageService } from '../../services/modal-image.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrl: './modal-image.component.css'
})
export class ModalImageComponent {
  
  public imgUpload: File;
  public imgTemp: any = null;

  constructor(
    public modalImageService: ModalImageService,
    private fileUploadService: FileUploadService

  ){}

  closeModal(){
    this.imgTemp = null;
    this.modalImageService.closeModal();
  }

  changeImage(file: File){

    this.imgUpload = file;

    if(!file){
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {

      this.imgTemp = reader.result;

    }

  }

  uploadImage(){

    const id = this.modalImageService.id;
    const type = this.modalImageService.type;

    // this.authService.updateFile(this.imgUpload, 'users', this.user().id);

    this.fileUploadService.updateFile(this.imgUpload, type, id)
      .subscribe({
        next: (resp) => {
          Swal.fire({
            title: 'Attention',
            text: 'Img Save',
            icon: 'success'
          })
          this.modalImageService.newImg.emit(resp.filename);
          this.closeModal();
        },
        error: (err) => {
          Swal.fire({
            title: 'Attention',
            text: 'Img Not Save',
            icon: 'error'
          })
        }
      })

  }

}
