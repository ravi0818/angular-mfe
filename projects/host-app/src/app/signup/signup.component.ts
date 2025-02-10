import { Component, effect, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmPasswordValidator } from '../custom-validators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  store = inject(Store);
  router = inject(Router);
  authService = inject(AuthService);

  hidePassword = true;

  signupForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    [ConfirmPasswordValidator]
  );

  errorMessages = {
    name: {
      required: 'Name is required',
    },
    email: {
      required: 'Email is required',
      email: 'Invalid email format',
    },
    password: {
      required: 'Password is required',
      minlength: 'Password must be at least 6 characters long',
    },
    confirmPassword: {
      required: 'Confirm Password is required',
      passwordMismatch: 'Passwords do not match',
    },
  };

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  handleSignup() {
    if (this.signupForm.invalid) return;

    // this.store.dispatch(
    //   AuthActions.signupSuccess({
    //     name: this.signupForm.value.name || '',
    //     email: this.signupForm.value.email || '',
    //     token: this.signupForm.value.password || '',
    //   })
    // );

    this.authService
      .signup(
        this.signupForm.value.name || '',
        this.signupForm.value.email || '',
        this.signupForm.value.password || ''
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
