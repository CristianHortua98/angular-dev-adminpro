import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {

  menuItems: any[] = [];

  constructor(
    private sidebarService:SidebarService,
    private authService: AuthService
  ){

    this.menuItems = sidebarService.menu;
    // console.log(this.menuItems);

  }

  logout(){
    this.authService.logout();
  }

}
