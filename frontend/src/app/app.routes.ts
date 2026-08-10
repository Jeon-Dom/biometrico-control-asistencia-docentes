import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';

export const routes: Routes = [
  {
    path: '',
    component: Login
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard-placeholder/dashboard-placeholder')
      .then(m => m.DashboardPlaceholder)
  },
];
