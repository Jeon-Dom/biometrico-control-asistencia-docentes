import csv
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import (
    APP_NAME,
    APP_VERSION,
    DEBUG,
    FRONTEND_URL,
)

app = FastAPI(
    title=APP_NAME,
    description="API para el sistema de control de asistencia docente mediante biométrico ZKTeco",
    version=APP_VERSION,
    debug=DEBUG,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_URL,
        "http://127.0.0.1:4200",
        "http://localhost:4200"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CSV_PATH = "app/data/marcaciones.csv"

@app.get("/")
def root():
    return {
        "message": "API de Control de Asistencia Docente funcionando correctamente",
        "version": APP_VERSION,
    }

@app.get("/docentes/{id}")
def get_docente(id: int):
    if not os.path.exists(CSV_PATH):
        raise HTTPException(status_code=404, detail="Archivo CSV no encontrado")
    
    with open(CSV_PATH, encoding="utf-8-sig", errors="replace") as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Buscar columna de ID flexiblemente por si hay caracteres invisibles
            id_col = [col for col in row.keys() if col and 'Id' in col and 'Empleado' in col]
            id_col_name = id_col[0] if id_col else 'Id del Empleado'
            
            if str(row.get(id_col_name, '')).strip() == str(id):
                return {
                    "id": id,
                    "ccuv": id,
                    "nombres": row.get('Nombres', '').strip(),
                    "apellidos": row.get('Apellidos', '').strip()
                }
    raise HTTPException(status_code=404, detail="Docente no encontrado")

@app.get("/asistencia/{ccuv}")
def get_asistencia(ccuv: int, fecha: str = None):
    if not os.path.exists(CSV_PATH):
        raise HTTPException(status_code=404, detail="Archivo CSV no encontrado")
    
    target_fecha = fecha or "2026-07-01"
    asistencia = {
        "fecha": target_fecha,
        "entrada": None,
        "salida": None,
        "entrada_hora_extra": None,
        "salida_hora_extra": None
    }
    
    found = False
    with open(CSV_PATH, encoding="utf-8-sig", errors="replace") as f:
        reader = csv.DictReader(f)
        for row in reader:
            tipo_col = [col for col in row.keys() if col and 'Tipo' in col and 'Marcaci' in col]
            tipo_col_name = tipo_col[0] if tipo_col else 'Tipo de Marcación'
            
            id_col = [col for col in row.keys() if col and 'Id' in col and 'Empleado' in col]
            id_col_name = id_col[0] if id_col else 'Id del Empleado'

            if str(row.get(id_col_name, '')).strip() == str(ccuv) and str(row.get('Fecha', '')).strip() == target_fecha:
                found = True
                tipo = str(row.get(tipo_col_name, '')).strip()
                hora = str(row.get('Hora', '')).strip()
                
                if tipo == 'Entrada':
                    asistencia['entrada'] = hora
                elif tipo == 'Salida':
                    asistencia['salida'] = hora
                elif 'Entrada' in tipo and 'Extra' in tipo:
                    asistencia['entrada_hora_extra'] = hora
                elif 'Salida' in tipo and 'Extra' in tipo:
                    asistencia['salida_hora_extra'] = hora
                    
    if not found:
        raise HTTPException(status_code=404, detail="Asistencia no encontrada")
        
    return asistencia
