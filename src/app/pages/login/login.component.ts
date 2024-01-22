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
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from '../../services/api-calls/auth.service';

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
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    public location: Location,
    private formBuilder: FormBuilder,
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe(() => {
      this.location.back();
    });
  }

  hideEmailError = true;
  getEmailErrorMessage() {
    const emailError = this.loginForm.get('email')!;
    if (emailError.hasError('required')) {
      return 'You must fill in your email';
    }

    return emailError.hasError('email') ? 'Not a valid email' : '';
  }

  hidePasswordError = true;
  getPasswordErrorMessage() {
    const passwordError = this.loginForm.get('password')!;
    if (passwordError.hasError('required')) {
      return 'You must fill in your password';
    }

    return '';
  }
}
