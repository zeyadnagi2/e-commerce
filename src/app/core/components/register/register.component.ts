import { AuthService } from './../../../shared/services/authentication/auth.service';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { log } from 'console';
import { register } from 'module';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,10}$/)]),
      rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,10}$/)]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    },
    this.compare
  );

  compare(fGroup: AbstractControl) {
    if (fGroup.get('password')?.value === fGroup.get('rePassword')?.value) {
      return null;
    } else {
      return { misMatch: true };
    }
  }

  register(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm);
      this._AuthService.SignUp(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            this._Router.navigate(['/login']);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
