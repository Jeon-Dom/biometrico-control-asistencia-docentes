from pydantic import BaseModel
from typing import Optional


class Asistencia(BaseModel):
    id_empleado: str
    nombres: str
    apellidos: str
    fecha: str
    entrada: Optional[str] = None
    salida: Optional[str] = None
    entrada_hora_extra: Optional[str] = None
    salida_hora_extra: Optional[str] = None