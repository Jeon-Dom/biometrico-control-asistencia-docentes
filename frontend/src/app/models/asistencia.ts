export interface AsistenciaDocente {
  id: number;
  nombreDocente: string;
  ccuv: string;
  horasDia: number;
  horasSemana: number;
  horasMes: number;
  fecha: string;
  estado: "Puntual" | "Tardanza" | "Falta";
}
