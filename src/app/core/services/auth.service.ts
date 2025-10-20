import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  // Señal reactiva para el estado de autenticación
  isAuthenticated = signal<boolean>(this.hasValidToken());
  currentUser = signal<User | null>(this.getUserFromStorage());

  constructor(private router: Router) {}

  /**
   * Realiza el login del usuario
   * NOTA: Esta es una implementación de ejemplo con credenciales mock
   * En producción, deberías hacer una llamada HTTP real a tu API
   */
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    // Simulación de llamada a API
    // Credenciales de ejemplo: usuario: admin, password: admin123
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      const mockUser: User = {
        id: '1',
        username: credentials.username,
        name: 'Juan Pérez',
        email: 'juan.perez@santander.com',
        role: 'admin'
      };

      const mockToken = this.generateMockToken();

      const response: AuthResponse = {
        user: mockUser,
        token: mockToken
      };

      // Simular delay de red
      return of(response).pipe(
        delay(500)
      );
    } else {
      return throwError(() => new Error('Credenciales inválidas')).pipe(
        delay(500)
      );
    }
  }

  /**
   * Guarda los datos de autenticación y actualiza el estado
   */
  saveAuthData(authResponse: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, authResponse.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(authResponse.user));
    this.isAuthenticated.set(true);
    this.currentUser.set(authResponse.user);
  }

  /**
   * Cierra la sesión del usuario
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  /**
   * Obtiene el token almacenado
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Verifica si existe un token válido
   */
  private hasValidToken(): boolean {
    const token = this.getToken();
    return token !== null && token.length > 0;
  }

  /**
   * Obtiene el usuario del almacenamiento local
   */
  private getUserFromStorage(): User | null {
    const userJson = localStorage.getItem(this.USER_KEY);
    if (userJson) {
      try {
        return JSON.parse(userJson);
      } catch {
        return null;
      }
    }
    return null;
  }

  /**
   * Genera un token mock para desarrollo
   * En producción, el token vendría del servidor
   */
  private generateMockToken(): string {
    const timestamp = new Date().getTime();
    const random = Math.random().toString(36).substring(2);
    return `mock_token_${timestamp}_${random}`;
  }

  /**
   * Verifica si el usuario tiene un rol específico
   */
  hasRole(role: string): boolean {
    const user = this.currentUser();
    return user?.role === role;
  }
}
