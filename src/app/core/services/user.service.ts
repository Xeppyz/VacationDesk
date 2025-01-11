import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from '../models/user.mode';

const API_URL = '/BotApi/api/cv/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient: HttpClient = inject(HttpClient);

  constructor() {}

  public validateUser(
    email: string,
    password: string
  ): Observable<UserResponse[]> {
    const url = `${API_URL}IsValidUsr/${email}/${encodeURIComponent(password)}`;
    return this.httpClient.get<UserResponse[]>(url);
  }

  setToken(token: string, role: number): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userRole', this.mapRole(role)); // Mapea y almacena el rol como string
  }
  getRole(): string {
    return localStorage.getItem('userRole') || 'unknown';
  }
  mapRole(role: any): string {
    const numericRole = Number(role);
    if (isNaN(numericRole)) {
      return 'unknown'; // Si no es un número válido, devuelve 'unknown'
    }

    switch (numericRole) {
      case 3:
        return '3';
      case 2:
        return '2';
      case 1:
        return '1';
      default:
        return 'unknown';
    }
  }

  getToken(): string {
    return localStorage.getItem('authToken') || ''; // recueperamos el tokn
  }

  isLoggedIn(): boolean {
    return !!this.getToken(); // Verificamos si el token existe
  }
  loguot(): void {
    localStorage.removeItem('authToken'); // Eliminamos el token
  }
}
