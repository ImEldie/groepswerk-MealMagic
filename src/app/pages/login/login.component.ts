import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatDividerModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, public location: Location) {}

  login() {
    this.authService.login(this.email, this.password).subscribe((data) => {
      this.email = '';
      this.password = '';
      this.location.back();
    });
  }

  emailError = new FormControl('', [Validators.required, Validators.email]);
  hideEmailError = true;
  getEmailErrorMessage() {
    if (this.emailError.hasError('required')) {
      return 'You must fill in your email';
    }

    return this.emailError.hasError('email') ? 'Not a valid email' : '';
  }

  passwordError = new FormControl('', [Validators.required, Validators.email]);
  hidePasswordError = true;
  getPasswordErrorMessage() {
    if (this.emailError.hasError('required')) {
      return 'You must fill in your password';
    }

    return this.emailError.hasError('email') ? 'Incorrect password' : '';
  }
}
