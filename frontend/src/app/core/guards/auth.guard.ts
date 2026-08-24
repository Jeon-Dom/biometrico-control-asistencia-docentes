import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Bloquea el acceso a cualquier ruta protegida si no hay sesión iniciada.
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.estaAutenticado()) {
    return true;
  }

  // ⚠️ CAMBIAR AQUÍ SI LA RUTA DE LOGIN NO ES LA RAÍZ '/'
  router.navigate(['/']);
  return false;
};
