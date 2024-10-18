import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: ''
})
export class PromesasComponent implements OnInit {
  
  authService = inject(AuthService);

  public user = computed(() => this.authService.currentUser());

  
  ngOnInit(): void {
    
    this.getUsuarios().then(usuarios => {
      // console.log(usuarios);
    });
    
  }
  
  constructor(){

    effect(() => console.log('User changed:', this.user()));

  }



  updateEmail(){

    const email = 'correo@correo.com';

    this.authService.updateEmailUser(email);

  }

  getUsuarios(){

    const promesa = new Promise(resolve => {
      fetch('https://reqres.in/api/users')
        .then(resp => resp.json())
        .then(body => resolve(body.data))
    });

    return promesa;

  }



}
