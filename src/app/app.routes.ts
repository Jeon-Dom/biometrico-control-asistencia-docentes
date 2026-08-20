import { Routes } from "@angular/router";
import { AsistenciasComponent } from "./components/asistencias/asistencias.component";

export const routes: Routes = [
  { path: "", redirectTo: "asistencias", pathMatch: "full" },
  { path: "asistencias", component: AsistenciasComponent }
];

