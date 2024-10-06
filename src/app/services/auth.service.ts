import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environments } from '../../environments/environments';
import { LoginForm } from '../auth/interfaces/login-form.interface';
import { RegisterForm } from '../auth/interfaces/register-form.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient){}

  createUser(formData: RegisterForm){

    const { terms, password2, ...userData } = formData;
    console.log(userData);

    return this.http.post(`${this.baseUrl}/auth/create-user`, userData)
      .pipe(
        tap((resp: any) => {
          //ALMACENAMOS EL TOKEN EN EL LOCALSTORAGE
          localStorage.setItem('token', resp.token);
        })
      );

  }

  login(formData: LoginForm){

    const { remember, ...loginData } = formData;

    return this.http.post(`${this.baseUrl}/auth/signin`, loginData)
      .pipe(
        tap((resp: any) => {
          //ALMACENAMOS EL TOKEN EN EL LOCALSTORAGE
          localStorage.setItem('token', resp.token);
        })
      )

  }

}
