import { Component, OnInit } from "@angular/core";
import { AsistenciaService } from "../../services/asistencia.service";
import { AsistenciaDocente } from "../../models/asistencia";

@Component({
  selector: "app-dashboard",
  standalone: true,
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  asistencias: AsistenciaDocente[] = [];

  constructor(private asistenciaService: AsistenciaService) {}

  ngOnInit(): void {
    this.asistencias = this.asistenciaService.getAsistencias();
  }
}
