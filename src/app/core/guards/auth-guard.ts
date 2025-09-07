import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  let _CookieService = inject(CookieService);
  let _Router = inject(Router);

  if (_CookieService.get('token')) {
    return true;
  } else {
    // _Router.navigate(['/login']);
    // return false;

    // url tree
   return _Router.parseUrl('/login');
  }
};
