import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './logout-button.html',
  styleUrl: './logout-button.scss'
})
export class LogoutButton {

  private authService = inject(AuthService);
  private router = inject(Router);

  onLogout(): void {
    this.authService.cerrarSesion();

    // ⚠️ CAMBIAR AQUÍ SI LA RUTA DE LOGIN NO ES LA RAÍZ '/'
    this.router.navigate(['/']);
  }
}
