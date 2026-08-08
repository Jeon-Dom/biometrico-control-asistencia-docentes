import os
from dotenv import load_dotenv

load_dotenv()

APP_NAME = os.getenv(
    "APP_NAME",
    "Sistema de Control de Asistencia Docente"
)

APP_VERSION = os.getenv(
    "APP_VERSION",
    "1.0.0"
)

DEBUG = os.getenv(
    "DEBUG",
    "True"
).lower() == "true"

FRONTEND_URL = os.getenv(
    "FRONTEND_URL",
    "http://localhost:4200"
)