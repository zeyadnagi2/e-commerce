import { BehaviorSubject, Observable } from 'rxjs';
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

  cartCount: BehaviorSubject<number> = new BehaviorSubject(0);

  GetLoggedUserCart(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`);
  }

  AddProductToCart(p_id: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`, { productId: p_id });
  }

  UpdateCartProductQuantity(p_id: string, count: number): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${p_id}`, { count: count });
  }

  RemoveSpecificCartItem(p_id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${p_id}`);
  }
}
