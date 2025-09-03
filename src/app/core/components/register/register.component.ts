import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { log } from 'console';
import { register } from 'module';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null),
    email: new FormControl(null),
    password: new FormControl(null),
    rePassword: new FormControl(null),
    phone: new FormControl(null),
  });

  register(): void {}
}
