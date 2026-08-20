import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AsistenciaService {
  private apiUrl = "http://localhost:8000";

  constructor(private http: HttpClient) {}

  login(credentials: { correo: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  getMarcaciones(filtros?: { ccuv?: string; fecha_desde?: string; fecha_hasta?: string; tipo?: string }): Observable<any> {
    let params = new HttpParams();
    if (filtros) {
      if (filtros.ccuv) params = params.set("ccuv", filtros.ccuv);
      if (filtros.fecha_desde) params = params.set("fecha_desde", filtros.fecha_desde);
      if (filtros.fecha_hasta) params = params.set("fecha_hasta", filtros.fecha_hasta);
      if (filtros.tipo && filtros.tipo !== "Todos") params = params.set("tipo", filtros.tipo);
    }
    return this.http.get(`${this.apiUrl}/marcaciones`, { params });
  }

  getMarcacionesPorDocente(ccuv: string, fecha_desde?: string, fecha_hasta?: string): Observable<any> {
    let params = new HttpParams();
    if (fecha_desde) params = params.set("fecha_desde", fecha_desde);
    if (fecha_hasta) params = params.set("fecha_hasta", fecha_hasta);
    return this.http.get(`${this.apiUrl}/asistencia/${ccuv}`, { params });
  }

  exportarMarcaciones(formato: "excel" | "csv", filtros?: any): Observable<Blob> {
    let params = new HttpParams().set("formato", formato);
    if (filtros?.fecha_desde) params = params.set("fecha_desde", filtros.fecha_desde);
    if (filtros?.fecha_hasta) params = params.set("fecha_hasta", filtros.fecha_hasta);
    
    return this.http.get(`${this.apiUrl}/marcaciones/exportar`, { params, responseType: "blob" });
  }
}

