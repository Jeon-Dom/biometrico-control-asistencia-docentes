import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Bloquea el acceso al panel de Admin si el usuario no tiene ese rol.
export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getRol() === 'admin') {
    return true;
  }

  // ⚠️ CAMBIAR AQUÍ - confirmar con Guerrero el nombre real de su ruta de docente
  router.navigate(['/docente/panel']);
  return false;
};
