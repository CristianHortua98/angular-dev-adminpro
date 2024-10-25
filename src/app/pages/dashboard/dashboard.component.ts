import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent {

  authService = inject(AuthService);
  
  public user = computed(() => this.authService.currentUser());


  constructor(){
    console.log('DashboardComponent initialized');
  }

}
