import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  constructor() {}

  login(email: string, password: string) {
    return this.http.post(`${environment.backendUrl}/api/auth/login`, {
      email,
      password,
    });
  }

  signup(name: string, email: string, password: string) {
    return this.http.post(`${environment.backendUrl}/api/auth/signup`, {
      name,
      email,
      password,
    });
  }

  logout() {
    return this.http.post(`${environment.backendUrl}/api/auth/logout`, {});
  }
}
