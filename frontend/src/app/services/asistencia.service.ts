import { Injectable } from "@angular/core";
import { AsistenciaDocente } from "../models/asistencia";

@Injectable({
  providedIn: "root"
})
export class AsistenciaService {
  private mockAsistencias: AsistenciaDocente[] = [
    { id: 1, nombreDocente: "Dr. Carlos Mendoza", ccuv: "CCUV-001", horasDia: 8, horasSemana: 40, horasMes: 160, fecha: "2026-08-07", estado: "Puntual" },
    { id: 2, nombreDocente: "Ing. María Torres", ccuv: "CCUV-002", horasDia: 6, horasSemana: 35, horasMes: 145, fecha: "2026-08-07", estado: "Tardanza" },
    { id: 3, nombreDocente: "Lic. Juan Pérez", ccuv: "CCUV-003", horasDia: 0, horasSemana: 20, horasMes: 90, fecha: "2026-08-07", estado: "Falta" },
    { id: 4, nombreDocente: "Dra. Ana Gómez", ccuv: "CCUV-004", horasDia: 8, horasSemana: 40, horasMes: 160, fecha: "2026-08-07", estado: "Puntual" }
  ];

  getAsistencias(): AsistenciaDocente[] {
    return this.mockAsistencias;
  }
}
