import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

/**
 * Interceptor HTTP para agregar el token de autenticación a las peticiones
 * y manejar errores de autenticación
 *
 * Este interceptor:
 * 1. Agrega el token de autenticación en el header Authorization de cada petición
 * 2. Maneja errores 401 (No autorizado) cerrando sesión automáticamente
 * 3. Maneja errores 403 (Prohibido) mostrando un mensaje apropiado
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Obtener el token
  const token = authService.getToken();

  // Clonar la petición y agregar el token si existe
  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Enviar la petición y manejar errores
  return next(authReq).pipe(
    catchError((error) => {
      // Error 401: No autorizado - Token inválido o expirado
      if (error.status === 401) {
        console.warn('Sesión expirada o token inválido. Cerrando sesión...');
        authService.logout();
      }

      // Error 403: Prohibido - Usuario no tiene permisos
      if (error.status === 403) {
        console.error('Acceso prohibido: No tienes permisos para esta acción');
        // Opcional: Redirigir a una página de "Acceso denegado"
        // router.navigate(['/access-denied']);
      }

      // Propagar el error
      return throwError(() => error);
    })
  );
};
