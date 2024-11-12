import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { ListDoctorsResponse } from '../interfaces/list-doctors-response.interface';
import { Doctor } from '../interfaces/doctor.interface';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  baseUrl = environments.baseUrl;

  constructor(
    private http: HttpClient
  ){}

  get token(): string {

    return localStorage.getItem('token') || "";

  }

  get headers(){

    return {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    }

  }


  loadDoctors(offset: number = 5){

    const url = `${this.baseUrl}/doctors/list-doctors?offset=${offset}`;

    return this.http.get<ListDoctorsResponse>(url);

  }

  createDoctor(doctor: Doctor){

    const url = `${this.baseUrl}/doctors/create-doctor`;

    return this.http.post(url, doctor);

  }

  updateDoctor(id: number, doctor: Doctor){

    const url = `${this.baseUrl}/doctors/update-doctor/${id}`;

    return this.http.patch(url, doctor);

  }

  deleteDoctor(id: number){

    const url = `${this.baseUrl}/doctors/delete-doctor/${id}`;

    return this.http.delete(url);

  }

  viewDoctor(id: number){

    const url = `${this.baseUrl}/doctors/${id}`;

    return this.http.get(url);

  }

}
