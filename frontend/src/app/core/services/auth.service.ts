import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  // ⚠️ CAMBIAR AQUÍ - confirmar con Basurto la URL exacta del backend.
  // Ahora mismo asume: http://localhost:8000/api/auth/login
  // Puede que en realidad sea solo http://localhost:8000/login
  private apiUrl = 'http://localhost:8000/api/auth';

  private token: string | null = null;
  private rol: string | null = null;

  login(data: LoginRequest): Observable<LoginResponse> {
    // ⚠️ CAMBIAR AQUÍ SI CAMBIA LA URL BASE - este endpoint se arma con apiUrl + '/login'
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data);
  }

  guardarSesion(response: LoginResponse): void {
    this.token = response.token;
    this.rol = response.rol;
    sessionStorage.setItem('token', response.token);
    sessionStorage.setItem('rol', response.rol);
  }

  getToken(): string | null {
    return this.token ?? sessionStorage.getItem('token');
  }

  getRol(): string | null {
    return this.rol ?? sessionStorage.getItem('rol');
  }

  cerrarSesion(): void {
    this.token = null;
    this.rol = null;
    sessionStorage.clear();
  }

  estaAutenticado(): boolean {
    return !!this.getToken();
  }
}
