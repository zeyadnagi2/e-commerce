import { register } from 'module';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _HttpClient = inject(HttpClient);

  SignIn(loginData: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, loginData);
  }

  SignUp(registerData: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, registerData);
  }
}
