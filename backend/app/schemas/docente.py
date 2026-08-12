from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime

# Esquema base compartido
class DocenteBase(BaseModel):
    ccuv: str
    nombres: str
    apellidos: str
    tipo_dedicacion: str

# Esquema para crear (recibe todo lo del base)
class DocenteCreate(DocenteBase):
    pass

# Esquema para actualizar (todos los campos son opcionales)
class DocenteUpdate(BaseModel):
    ccuv: Optional[str] = None
    nombres: Optional[str] = None
    apellidos: Optional[str] = None
    tipo_dedicacion: Optional[str] = None

# Esquema para devolver como respuesta de la API
class DocenteResponse(DocenteBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
