import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

/**
 * Guard para proteger rutas que requieren autenticación
 *
 * Uso en las rutas:
 * {
 *   path: 'dashboard',
 *   component: DashboardComponent,
 *   canActivate: [authGuard]
 * }
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Redirigir al login y guardar la URL intentada para redirigir después del login
  router.navigate(['/login'], {
    queryParams: { returnUrl: state.url }
  });

  return false;
};

/**
 * Guard para redirigir usuarios autenticados desde el login al dashboard
 *
 * Uso en las rutas:
 * {
 *   path: 'login',
 *   component: LoginComponent,
 *   canActivate: [loginGuard]
 * }
 */
export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    // Si el usuario ya está autenticado, redirigir al dashboard
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
