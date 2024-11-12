import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { environments } from '../../environments/environments';
import { LoginForm } from '../auth/interfaces/login-form.interface';
import { RegisterForm } from '../auth/interfaces/register-form.interface';
// import { User } from '../models/user.model';
import { AuthStatus } from '../auth/interfaces/auth-status.enum';
import { CreateUserResponse } from '../auth/interfaces/create-user-response.interface';
import { LoginResponse } from '../auth/interfaces/login-response.interface';
import { CheckTokenResponse } from '../auth/interfaces/check-token-response.interface';
import { User } from '../auth/interfaces/models/user.interface';
import { ProfileUpdateForm } from '../interfaces/profile-update.interface';
import { Router } from '@angular/router';
import { UpdateFileResponse } from '../interfaces/update-file-response.interface';
import { FileUploadService } from './file-upload.service';
import { UserListResponse } from '../auth/interfaces/user-list-response.interface';
import { MenuItem } from '../auth/interfaces/menu-item.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environments.baseUrl;
  private router = inject(Router);

  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  //VARIABLES PUBLICAS
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());
  public userInfo: User;
  public imgUrl = computed(() => {
    if(this.currentUser().img){
      return `${this.baseUrl}/upload/users/${this.currentUser().img}`;
    }else{
      return `${this.baseUrl}/upload/users/no-image.png`;
    }
  });


  constructor(
    private http: HttpClient,
    private fileUploadService: FileUploadService
  ){
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication(user:User, token: string, menu: MenuItem[]): boolean{

    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
    return true;

  }

  private updateImgUser(filename: string){

    const currentUser = this._currentUser();

    this._currentUser.set({
      ...currentUser,
      img: filename
    })

  }

  get token(): string{

    return localStorage.getItem('token') || '';

  }

  get headers(){

    return {

      headers: {
        'Authorization': `Bearer ${this.token}`
      }

    }

  }

  createUser(formData: RegisterForm){

    const { terms, password2, ...userData } = formData;
    console.log(userData);

    return this.http.post<CreateUserResponse>(`${this.baseUrl}/auth/create-user`, userData)
      .pipe(
        map(({user, token, menu}) => {
          this.setAuthentication(user, token, menu);
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
        map(({user, token, menu}) => this.setAuthentication(user, token, menu)),
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

    return this.http.get<CheckTokenResponse>(`${this.baseUrl}/auth/check-token`)
      .pipe(
        map(({user, token, menu}) => {
          this.setAuthentication(user, token, menu);
          return true;
        }),
        catchError(err => {
          this.logout();
          this._authStatus.set(AuthStatus.notAuthenticated);
          return of(false);
        })
      )

  }

  updateProfile(profileUpdateForm: ProfileUpdateForm){

    return this.http.patch<User>(`${this.baseUrl}/auth/update-user/${this.currentUser().id}`, profileUpdateForm)
      .pipe(
        map(({name, email}) => {

          const currentUser = this._currentUser();

          this._currentUser.set({
            ...currentUser,
            email,
            name
          })

        })
      )

  }

  logout(){


    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
    this.router.navigateByUrl('/login');

  }

  updateFile(archivo: File, type: 'users'|'hospitals'|'doctors', id: number){

    return this.fileUploadService.updateFile(archivo, type, id)
      .pipe(
        tap((resp) => {
          this.updateImgUser(resp.filename);
        }),
        map((resp) => resp)
      )
  }

  loadUsers(offset: number = 5){

    const url = `${this.baseUrl}/auth/users?offset=${offset}`;

    return this.http.get<UserListResponse>(url)
      .pipe(
        // delay(3000)
      )

  }


  deleteUser(user: User){

    const url = `${this.baseUrl}/auth/delete-user/${user.id}`;

    return this.http.delete(url);

  }


  saveUser(user: User){

    return this.http.patch<User>(`${this.baseUrl}/auth/update-user/${user.id}`, user);

  }

}
