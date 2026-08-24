import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    component: Login
  },
  {
    // ⚠️ CAMBIAR AQUÍ - confirmar con Guerrero el nombre real de la ruta de su Dashboard de Admin.
    // Por ahora se mantiene 'dashboard' con el placeholder temporal, protegida con los guards.
    path: 'admin/dashboard',
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('./features/dashboard-placeholder/dashboard-placeholder')
      .then(m => m.DashboardPlaceholder)
  },
  {
    // ⚠️ CAMBIAR AQUÍ - confirmar con Guerrero el nombre real de la ruta del panel de Docente.
    path: 'docente/panel',
    canActivate: [authGuard],
    loadComponent: () => import('./features/dashboard-placeholder/dashboard-placeholder')
      .then(m => m.DashboardPlaceholder)
  },
];
