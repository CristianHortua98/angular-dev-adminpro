import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { ListHospitalsResponse } from '../interfaces/list-hospitals-response.interface';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  baseUrl = environments.baseUrl;

  constructor(
    private http: HttpClient
  ){}

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

  listHospital(){

    const url = `${this.baseUrl}/hospitals/list`;

    return this.http.get(url, this.headers);

  }

  loadHospitals(offset: number = 5) {

    const url = `${this.baseUrl}/hospitals/list-hospitals?offset=${offset}`;

    return this.http.get<ListHospitalsResponse>(url, this.headers);

  }

  createHospital(name: string){

    const url = `${this.baseUrl}/hospitals/create-hospital`;

    return this.http.post(url, {name}, this.headers);

  }

  updateHospital(id: number, name: string){

    const url = `${this.baseUrl}/hospitals/update-hospital/${id}`;

    return this.http.patch(url, {name}, this.headers);

  }

  deleteHospital(id: number){

    const url = `${this.baseUrl}/hospitals/delete-hospital/${id}`;

    return this.http.delete(url, this.headers);

  }

}
