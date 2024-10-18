import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { map, of, Observable, tap } from 'rxjs';
import { UpdateFileResponse } from '../interfaces/update-file-response.interface';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private readonly baseUrl: string = environments.baseUrl;

  constructor(
    private http: HttpClient,
  ){}

  get token(): string{

    return localStorage.getItem('token') || '';

  }


  updateFile(archivo: File, type: 'users'|'hospitals'|'doctors', id: number){

    const url = `${this.baseUrl}/upload/${type}/${id}`;

    const formData = new FormData();
    formData.append('file', archivo);

    return this.http.put<UpdateFileResponse>(url, formData, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }

}
