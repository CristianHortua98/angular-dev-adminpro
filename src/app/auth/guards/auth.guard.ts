import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces/auth-status.enum';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.authStatus() === AuthStatus.authenticated){
    // console.log(authService.authStatus())
    return true;
  }

  router.navigateByUrl('/login');
  return true;
};
