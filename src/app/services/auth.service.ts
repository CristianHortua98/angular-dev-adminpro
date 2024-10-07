import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environments } from '../../environments/environments';
import { LoginForm } from '../auth/interfaces/login-form.interface';
import { RegisterForm } from '../auth/interfaces/register-form.interface';
import { User } from '../models/user.model';
import { AuthStatus } from '../auth/interfaces/auth-status.enum';
import { CreateUserResponse } from '../auth/interfaces/create-user-response.interface';
import { LoginResponse } from '../auth/interfaces/login-response.interface';
import { CheckTokenResponse } from '../auth/interfaces/check-token-response.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environments.baseUrl;

  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  //VARIABLES PUBLICAS
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor(private http: HttpClient){
    this.checkAuthStatus().subscribe();
  }


  private setAuthentication(user:User, token: string): boolean{

    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);

    return true;

  }

  createUser(formData: RegisterForm){

    const { terms, password2, ...userData } = formData;
    console.log(userData);

    return this.http.post<CreateUserResponse>(`${this.baseUrl}/auth/create-user`, userData)
      .pipe(
        map(({user, token}) => {
          this.setAuthentication(user, token);
        })
        // catchError(err => {
        //   return throwError(() => err.error.message);
        // })
      );

  }

  login(formData: LoginForm){

    const { remember, ...loginData } = formData;

    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/signin`, loginData)
      .pipe(
        map(({user, token}) => this.setAuthentication(user, token)),
        // catchError(err => {
        //   return throwError(() => err.error.message);
        // })
      )

  }

  checkAuthStatus(): Observable<boolean>{

    const token = localStorage.getItem('token');

    if(!token){
      //LOGOUT
      this.logout();
      return of(false);
    }

    return this.http.get<CheckTokenResponse>(`${this.baseUrl}/auth/check-token`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .pipe(
        map(({user, token}) => this.setAuthentication(user, token)),
        catchError(err => {
          this._authStatus.set(AuthStatus.notAuthenticated);
          return of(false);
        })
      )

  }

  logout(){

    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);

  }

}
