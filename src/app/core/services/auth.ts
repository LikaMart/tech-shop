import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
  avatar: string;
  address: string;
  phone: string;
  zipcode: string;
  gender: 'MALE' | 'FEMALE';
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'https://api.everrest.educata.dev';

  isLoggedIn = signal<boolean>(!!localStorage.getItem('access.token'));

  signIn(body: SignInRequest) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/sign_in`, body).pipe(
      tap((res) => {
        localStorage.setItem('access.token', res.access_token);
        localStorage.setItem('refresh.token', res.refresh_token);
        this.isLoggedIn.set(true);
      }),
    );
  }

  signUp(body: SignUpRequest) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/sign_up`, body).pipe(
      tap((res) => {
        localStorage.setItem('access.token', res.access_token);
        localStorage.setItem('refresh.token', res.refresh_token);
        this.isLoggedIn.set(true);
      }),
    );
  }

  signOut() {
    localStorage.removeItem('access.token');
    localStorage.removeItem('refresh.token');
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }
}
