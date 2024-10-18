import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { environments } from '../../../environments/environments';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {

  public baseUrl = environments.baseUrl;

  public user = computed(() => this.authService.currentUser());
  public imgUrl = computed(() => this.authService.imgUrl());

  constructor(private authService:AuthService){

    // this.imgUrl = authService.imageUrl;

  }

  logout(){

    this.authService.logout();

  }

}
