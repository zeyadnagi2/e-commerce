import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  let _CookieService = inject(CookieService);

  if (req.url.includes('cart') || req.url.includes('wishlist') || req.url.includes('orders')) {
    req = req.clone({
      setHeaders: { token: _CookieService.get('token') },
    });
  }

  return next(req);
};
