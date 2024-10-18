import { ChangeDetectorRef, Component, computed } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';
import { environments } from '../../../environments/environments';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: ''
})
export class ProfileComponent {

  public baseUrl = environments.baseUrl;

  public user = computed(() => this.authService.currentUser());
  public imgUpload: File;
  public imgUrl = computed(() => this.authService.imgUrl());
  public imgTemp: any = null;

  public profileForm: FormGroup;

  constructor(
    private authService:AuthService,
    private fileUploadService: FileUploadService,
    private fb: FormBuilder
  ){

    // this.imgUrl = authService.imageUrl;
    this.profileForm = this.fb.group({
      name: [this.user().name, [Validators.required]],
      email: [this.user().email, [Validators.required, Validators.email]],
    })

  }


  updateProfile(){

    this.authService.updateProfile(this.profileForm.value)
      .subscribe({
        next:(resp) => {
          Swal.fire({
            title: 'Attention',
            text: 'User Updated',
            icon: 'success'
          })
        },
        error: (err) => {
          Swal.fire({
            title: 'Attention',
            text: err.error.message,
            icon: 'error'
          })
        }
      })

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

    // this.authService.updateFile(this.imgUpload, 'users', this.user().id);

    this.authService.updateFile(this.imgUpload, 'users', this.user().id)
      .subscribe({
        next: (resp) => {
          Swal.fire({
            title: 'Attention',
            text: 'Img Save',
            icon: 'success'
          })
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
