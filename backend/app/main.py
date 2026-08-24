from csv import DictReader
from pathlib import Path

from fastapi import FastAPI
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

@app.get("/")
def root():
    return {
        "message": "API de Control de Asistencia Docente funcionando correctamente",
        "version": APP_VERSION,
    }


from app.routes.asistencia import router as asistencia_router
from app.routes.ccuv import router as ccuv_router
from app.routes.docente import router as docente_router

app.include_router(asistencia_router)
app.include_router(ccuv_router)
app.include_router(docente_router)