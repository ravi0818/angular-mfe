import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
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
import { AuthActions, selectIsLoggedIn } from 'common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  store = inject(Store);
  router = inject(Router);

  readonly loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  errorMessages = {
    email: {
      required: 'Email is required',
      email: 'Invalid email format',
    },
    password: {
      required: 'Password is required',
    },
  };

  async checkLogin() {
    const isLoggedIn = await firstValueFrom(
      this.store.select(selectIsLoggedIn)
    );

    if (isLoggedIn) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.checkLogin();
  }

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  handleLogin() {
    this.store.dispatch(
      AuthActions.loginSuccess({
        email: this.loginForm.value.email || '',
        token: this.loginForm.value.password || '',
      })
    );

    this.router.navigate(['/']);
  }
}
