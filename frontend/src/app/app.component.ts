import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 30px; font-family: Segoe UI, Arial, sans-serif; background-color: #f8f9fa; min-height: 100vh;">
      <!-- Header con Logo y Marca -->
      <header style="display: flex; align-items: center; gap: 20px; margin-bottom: 30px; background: white; padding: 15px 25px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
        <img src="assets/logo.png" alt="Logo Yavirac" style="height: 60px;">
        <div>
          <h1 style="color: #002d62; margin: 0; font-size: 24px;">Dashboard de Asistencia</h1>
          <p style="color: #555; margin: 0; font-weight: 600;">Instituto Superior Tecnológico Yavirac</p>
        </div>
      </header>

      <!-- Información del Docente -->
      <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); margin-bottom: 25px;">
        <h3 style="margin-top: 0; color: #002d62; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">Información del Docente</h3>
        <p style="margin: 10px 0;"><strong>Nombre:</strong> Carlos Guerrero</p>
        <p style="margin: 10px 0;"><strong>CCUV:</strong> CCUV-849201</p>
      </div>

      <!-- Tarjetas de Horas -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 25px;">
        <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-top: 4px solid #002d62;">
          <h4 style="margin: 0; color: #666;">Horas del Día</h4>
          <p style="font-size: 26px; font-weight: bold; color: #002d62; margin: 10px 0 0 0;">6.5 hrs</p>
        </div>
        <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-top: 4px solid #2ecc71;">
          <h4 style="margin: 0; color: #666;">Horas de la Semana</h4>
          <p style="font-size: 26px; font-weight: bold; color: #002d62; margin: 10px 0 0 0;">32.0 hrs</p>
        </div>
        <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-top: 4px solid #e74c3c;">
          <h4 style="margin: 0; color: #666;">Horas del Mes</h4>
          <p style="font-size: 26px; font-weight: bold; color: #002d62; margin: 10px 0 0 0;">128.5 hrs</p>
        </div>
      </div>

      <!-- Tabla de Estado -->
      <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
        <h3 style="margin-top: 0; color: #002d62; margin-bottom: 20px;">Estado de Asistencia Reciente</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="text-align: left; background: #f8f9fa;">
            <th style="padding: 12px; border-bottom: 2px solid #dee2e6;">Fecha</th>
            <th style="padding: 12px; border-bottom: 2px solid #dee2e6;">Entrada</th>
            <th style="padding: 12px; border-bottom: 2px solid #dee2e6;">Salida</th>
            <th style="padding: 12px; border-bottom: 2px solid #dee2e6;">Estado</th>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px;">07/08/2026</td>
            <td style="padding: 12px;">08:00 AM</td>
            <td style="padding: 12px;">02:30 PM</td>
            <td style="padding: 12px;"><span style="background: #d4edda; color: #155724; padding: 4px 10px; border-radius: 15px; font-size: 12px; font-weight: 600;">Puntual</span></td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px;">06/08/2026</td>
            <td style="padding: 12px;">08:20 AM</td>
            <td style="padding: 12px;">02:00 PM</td>
            <td style="padding: 12px;"><span style="background: #fff3cd; color: #856404; padding: 4px 10px; border-radius: 15px; font-size: 12px; font-weight: 600;">Tardanza</span></td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px;">05/08/2026</td>
            <td style="padding: 12px;">08:15 AM</td>
            <td style="padding: 12px;">01:30 PM</td>
            <td style="padding: 12px;"><span style="background: #fff3cd; color: #856404; padding: 4px 10px; border-radius: 15px; font-size: 12px; font-weight: 600;">Tardanza</span></td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px;">04/08/2026</td>
            <td style="padding: 12px;">---</td>
            <td style="padding: 12px;">---</td>
            <td style="padding: 12px;"><span style="background: #f8d7da; color: #721c24; padding: 4px 10px; border-radius: 15px; font-size: 12px; font-weight: 600;">Falta</span></td>
          </tr>
        </table>
      </div>
    </div>
  `
})
export class AppComponent {}

