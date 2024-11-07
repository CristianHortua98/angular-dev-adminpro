import { computed, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const user = computed(() => authService.currentUser());

  if(user().role === 'ADMIN_ROLE'){

    return true;

  }else{

    router.navigateByUrl('/dashboard');
    return false;

  }

};
