import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { log } from 'console';
import { AuthService } from '../../../shared/services/authentication/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  private readonly _CookieService = inject(CookieService);

  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^\w{6,10}$/)]],
  });

  login() {
    if (this.loginForm.valid) {
      this._AuthService.SignIn(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            this._CookieService.set('token', res.token);
            this._AuthService.decodeToken();
            this._Router.navigate(['/home']);
          }
        },
      });
    }
  }
}
