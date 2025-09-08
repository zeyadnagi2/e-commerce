import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly _HttpClient = inject(HttpClient);
  private readonly _CookieService = inject(CookieService);

  GetLoggedUserCart(): Observable<any> {
    return this._HttpClient.get(`${environment}/api/v1/cart`, {
      headers: {token:this._CookieService.get('token')},
    });
  }
}
