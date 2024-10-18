import { Component, computed } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { AuthService } from '../../services/auth.service';
import { environments } from '../../../environments/environments';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {

  private baseUrl = environments.baseUrl;

  menuItems: any[] = [];
  public user = computed(() => this.authService.currentUser());
  public imgUrl = computed(() => this.authService.imgUrl());

  constructor(
    private sidebarService:SidebarService,
    private authService: AuthService
  ){

    this.menuItems = sidebarService.menu;
    // this.imgUrl = authService.imageUrl;

  }

  logout(){
    this.authService.logout();
  }

}
