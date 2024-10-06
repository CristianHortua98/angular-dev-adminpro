import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    document: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
    terms: [false, Validators.requiredTrue]
  }, {
    validators: this.passwordEquals('password', 'password2')
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ){}

  createUser(){

    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if(this.registerForm.invalid){
      return;
    }

    //PETICION CREACION
    this.authService.createUser(this.registerForm.value)
      .subscribe({
        next: () => {
        },
        error: (err) => {
          Swal.fire({
            title: 'Error',
            text: err.error.message,
            icon: 'error'
          })
        }
      })
      // .subscribe({
      //   // console.log('Usuario creado');
      //   // console.log(resp);
      // },
      // (err) => {
      //   // console.log(err);
      //   Swal.fire({
      //     title: 'Error',
      //     text: err.error.message,
      //     icon: 'error'
      //   })
      // });

  }

  fieldNoValid(campo: string): boolean{

    if(this.registerForm.get(campo)?.invalid && this.formSubmitted){
      // console.log(campo, this.formSubmitted);
      return true;
    }else{
      return false;
    }

  }

  aceptTerms(): boolean{

    return !this.registerForm.get('terms')?.value && this.formSubmitted;

  }

  passwordNoValid(): boolean{

    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if(pass1 !== pass2 && this.formSubmitted){
      return true;
    }else{
      return false;
    }
      
  }

  passwordEquals(pass1Name: string, pass2Name: string){

    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if(pass1Control?.value === pass2Control?.value){

        pass2Control?.setErrors(null);

      }else{

        pass2Control?.setErrors({notEquals:true});

      }

    }

  }

}
