import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 30px; font-family: Arial, sans-serif; background-color: #f4f6f9; min-height: 100vh;">
      <header style="margin-bottom: 25px;">
        <h1 style="color: #333; margin: 0;">Dashboard Inicial de Asistencia</h1>
        <p style="color: #666; margin-top: 5px;">Panel de control y registro docente (Datos temporales)</p>
      </header>

      <!-- Información del Docente -->
      <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 20px;">
        <h3 style="margin-top: 0; color: #2c3e50;">Información del Docente</h3>
        <p><strong>Nombre:</strong> Carlos Guerrero</p>
        <p><strong>CCUV:</strong> CCUV-849201</p>
      </div>

      <!-- Tarjetas de Horas -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 20px;">
        <div style="background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); border-left: 5px solid #3498db;">
          <h4 style="margin: 0; color: #7f8c8d;">Horas del Día</h4>
          <p style="font-size: 24px; font-weight: bold; color: #2c3e50; margin: 10px 0 0 0;">6.5 hrs</p>
        </div>
        <div style="background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); border-left: 5px solid #2ecc71;">
          <h4 style="margin: 0; color: #7f8c8d;">Horas de la Semana</h4>
          <p style="font-size: 24px; font-weight: bold; color: #2c3e50; margin: 10px 0 0 0;">32.0 hrs</p>
        </div>
        <div style="background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); border-left: 5px solid #e74c3c;">
          <h4 style="margin: 0; color: #7f8c8d;">Horas del Mes</h4>
          <p style="font-size: 24px; font-weight: bold; color: #2c3e50; margin: 10px 0 0 0;">128.5 hrs</p>
        </div>
      </div>

      <!-- Estado de Asistencia -->
      <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h3 style="margin-top: 0; color: #2c3e50;">Estado de Asistencia Reciente</h3>
        <table style="width: 100%; border-collapse: collapse; text-align: left;">
          <thead>
            <tr style="border-bottom: 2px solid #ddd; color: #555;">
              <th style="padding: 10px;">Fecha</th>
              <th style="padding: 10px;">Entrada</th>
              <th style="padding: 10px;">Salida</th>
              <th style="padding: 10px;">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px;">07/08/2026</td>
              <td style="padding: 10px;">08:00 AM</td>
              <td style="padding: 10px;">02:30 PM</td>
              <td style="padding: 10px;"><span style="background: #d4edda; color: #155724; padding: 4px 8px; border-radius: 4px; font-size: 12px;">Puntual</span></td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px;">06/08/2026</td>
              <td style="padding: 10px;">08:15 AM</td>
              <td style="padding: 10px;">02:00 PM</td>
              <td style="padding: 10px;"><span style="background: #fff3cd; color: #856404; padding: 4px 8px; border-radius: 4px; font-size: 12px;">Tardanza</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class AppComponent {}

