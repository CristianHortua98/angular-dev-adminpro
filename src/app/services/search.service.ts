import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { ListSearchTodoResponse } from '../interfaces/list-search-todo-response.interface';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  baseUrl = environments.baseUrl;

  constructor(
    private http: HttpClient,
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

  search(type: 'users'|'hospitals'|'doctors', term: string){

    const url = `${this.baseUrl}/todo/tipo/${type}/${term}`;

    return this.http.get(url, this.headers);

  }

  searchTodo(term: string){

    const url = `${this.baseUrl}/todo/${term}`;

    return this.http.get<ListSearchTodoResponse>(url, this.headers);

  }

}
