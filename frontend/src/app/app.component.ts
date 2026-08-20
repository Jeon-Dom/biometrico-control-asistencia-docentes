import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule],
  styles: [`
    * { box-sizing: border-box; margin: 0; padding: 0; }

    .app {
      min-height: 100vh;
      background: #f8fafc;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      overflow-x: hidden;
      overflow-y: hidden; 
    }

    /* ── HEADER ── */
    .header {
      background: #ffffff;
      padding: 0 32px;
      height: 56px; 
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 1200px;
      margin: 0 auto;
    }
    .header-wrapper {
        background: #ffffff;
        border-bottom: 1px solid #e2e8f0;
    }
    .header-left { display: flex; align-items: center; gap: 16px; }
    .header-logo { height: 36px; } 
    .header-titles h1 { color: #0f172a; font-size: 16px; font-weight: 600; }
    .header-titles p { color: #64748b; font-size: 12px; margin-top: 0; }

    /* ── CONTENEDOR PRINCIPAL ── */
    .content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 16px 32px; 
    }

    /* ── FILA SUPERIOR: DOCENTE CARD ── */
    .docente-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 16px 32px; 
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 16px; 
    }
    .avatar {
      width: 48px; height: 48px;
      background: #1a2a5e; 
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 20px; font-weight: bold; color: #fff;
    }
    .docente-text h2 { color: #0f172a; font-size: 18px; font-weight: 600; }
    .docente-text p { color: #64748b; font-size: 13px; margin-top: 2px; }
    .ccuv-badge {
      margin-left: auto;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      color: #475569;
      font-weight: bold;
      font-size: 13px;
      padding: 6px 16px;
      border-radius: 6px;
    }

    /* ── SECCIÓN INFERIOR ── */
    .dashboard-bottom {
      display: grid;
      grid-template-columns: 320px 1fr;
      gap: 32px;
      align-items: start;
    }

    /* ── STATS IZQUIERDA ── */
    .stats-column {
      display: flex;
      flex-direction: column;
      gap: 12px; 
    }
    .stat-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 14px 20px; 
    }
    .stat-label {
      color: #64748b;
      font-size: 11px;
      font-weight: bold;
      text-transform: uppercase;
    }
    .stat-value {
      font-size: 22px; 
      font-weight: bold;
      color: #0f172a;
      margin: 2px 0;
    }
    .stat-sub { color: #64748b; font-size: 12px; }

    /* ── DETALLES DERECHA ── */
    .main-section {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      overflow: hidden;
    }
    .section-header {
      padding: 12px 24px; 
      border-bottom: 1px solid #e2e8f0;
      background: #f8fafc;
    }
    .section-header h3 { color: #0f172a; font-size: 15px; font-weight: 600; }
    .section-header p { color: #64748b; font-size: 12px; margin-top: 2px; }

    .data-list {
      padding: 8px 24px;
    }
    .data-row {
      display: grid;
      grid-template-columns: 200px 1fr;
      padding: 8px 8px; 
      border-bottom: 1px solid #f1f5f9;
      align-items: center;
    }
    .data-row:last-child { border-bottom: none; }
    
    .data-key {
      color: #64748b;
      font-size: 13px;
      font-weight: 600;
    }
    .data-value {
      color: #0f172a;
      font-size: 14px;
      font-weight: 500;
      display: flex;
      align-items: center;
    }

    .pill {
      display: inline-block;
      padding: 3px 10px; 
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
      margin-left: 12px;
    }
    .pill-entrada { background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; }
    .pill-salida  { background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; }
    .pill-extra   { background: #fef9c3; color: #a16207; border: 1px solid #fef08a; }
    .pill-nd      { background: #f1f5f9; color: #64748b; border: 1px solid #e2e8f0; }

    /* ── LOADING Y ERROR ── */
    .center-box { text-align: center; padding: 60px 20px; color: #64748b; }
    .error-box {
      background: #fee2e2;
      border: 1px solid #fecaca;
      border-radius: 6px;
      padding: 16px 20px;
      color: #b91c1c;
      font-size: 14px;
      margin-bottom: 24px;
    }
  `],
  template: `
    <div class="app">

      <!-- HEADER -->
      <div class="header-wrapper">
        <header class="header">
          <div class="header-left">
            <img src="assets/logo.png" alt="Yavirac" class="header-logo">
            <div class="header-titles">
              <h1>Control de Asistencia Docente</h1>
              <p>Sistema Biométrico ZKTeco</p>
            </div>
          </div>
        </header>
      </div>

      <!-- MAIN LAYOUT -->
      <div class="content">

        <!-- LOADING -->
        <div class="center-box" *ngIf="cargando">
          <p>Cargando datos del sistema...</p>
        </div>

        <!-- ERROR -->
        <div class="error-box" *ngIf="error">
          ⚠️ &nbsp; Error de conexión con el servidor. Verifica que el sistema esté activo.
        </div>

        <div *ngIf="!cargando && !error && docente">
          
          <!-- DOCENTE -->
          <div class="docente-card">
            <div class="avatar">{{ docente.nombres.charAt(0) }}</div>
            <div class="docente-text">
              <h2>{{ docente.nombres }} {{ docente.apellidos }}</h2>
              <p>Docente registrado</p>
            </div>
            <div class="ccuv-badge">
              CCUV-{{ docente.ccuv }}
            </div>
          </div>

          <!-- BOTTOM GRID -->
          <div class="dashboard-bottom">
            
            <!-- STATS IZQUIERDA -->
            <div class="stats-column">
              <div class="stat-card">
                <div class="stat-label">Entrada Registrada</div>
                <div class="stat-value">{{ asistencia?.entrada || '—' }}</div>
                <div class="stat-sub">Jornada normal</div>
              </div>
              <div class="stat-card">
                <div class="stat-label">Salida Registrada</div>
                <div class="stat-value">{{ asistencia?.salida || '—' }}</div>
                <div class="stat-sub">Jornada normal</div>
              </div>
              <div class="stat-card">
                <div class="stat-label">Hora Extra Entrada</div>
                <div class="stat-value">{{ asistencia?.entrada_hora_extra || '—' }}</div>
                <div class="stat-sub">Salida: {{ asistencia?.salida_hora_extra || 'N/A' }}</div>
              </div>
            </div>

            <!-- DETALLES DERECHA -->
            <div class="main-section">
              <div class="section-header">
                <h3>Detalle de Marcaciones del Día</h3>
                <p>Registro desglosado de la jornada</p>
              </div>
              
              <div class="data-list" *ngIf="asistencia">
                <div class="data-row">
                  <div class="data-key">Fecha del Registro</div>
                  <div class="data-value">{{ asistencia.fecha }}</div>
                </div>
                <div class="data-row">
                  <div class="data-key">Entrada Normal</div>
                  <div class="data-value">
                    <strong>{{ asistencia.entrada || '--:--' }}</strong>
                    <span *ngIf="asistencia.entrada" class="pill pill-entrada">Completada</span>
                    <span *ngIf="!asistencia.entrada" class="pill pill-nd">No registrada</span>
                  </div>
                </div>
                <div class="data-row">
                  <div class="data-key">Salida Normal</div>
                  <div class="data-value">
                    <strong>{{ asistencia.salida || '--:--' }}</strong>
                    <span *ngIf="asistencia.salida" class="pill pill-salida">Completada</span>
                    <span *ngIf="!asistencia.salida" class="pill pill-nd">No registrada</span>
                  </div>
                </div>
                <div class="data-row">
                  <div class="data-key">Entrada Hora Extra</div>
                  <div class="data-value">
                    <strong>{{ asistencia.entrada_hora_extra || '--:--' }}</strong>
                    <span *ngIf="asistencia.entrada_hora_extra" class="pill pill-extra">Completada</span>
                    <span *ngIf="!asistencia.entrada_hora_extra" class="pill pill-nd">No registrada</span>
                  </div>
                </div>
                <div class="data-row">
                  <div class="data-key">Salida Hora Extra</div>
                  <div class="data-value">
                    <strong>{{ asistencia.salida_hora_extra || '--:--' }}</strong>
                    <span *ngIf="asistencia.salida_hora_extra" class="pill pill-extra">Completada</span>
                    <span *ngIf="!asistencia.salida_hora_extra" class="pill pill-nd">No registrada</span>
                  </div>
                </div>
              </div>

              <div class="data-list" *ngIf="!asistencia">
                 <p style="text-align: center; color: #64748b; padding: 40px;">Sin marcaciones para esta fecha</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit {
  docente: any = null;
  asistencia: any = null;
  cargando = true;
  error = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:8000/docentes/1').subscribe({
      next: (resDocente) => {
        this.docente = resDocente;
        this.http.get('http://localhost:8000/asistencia/1?fecha=2026-07-01').subscribe({
          next: (res) => { this.asistencia = res; this.cargando = false; },
          error: ()   => { this.cargando = false; }
        });
      },
      error: () => { this.error = true; this.cargando = false; }
    });
  }
}
