from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class DocenteBase(BaseModel):
    ccuv: str = Field(..., description="Identificador único del docente (Id del Empleado)")
    nombres: str = Field(..., description="Nombres completos del docente")
    apellidos: str = Field(..., description="Apellidos completos del docente")


class DocenteCreate(DocenteBase):
    pass


class DocenteUpdate(BaseModel):
    ccuv: Optional[str] = Field(None, description="Identificador único del docente (Id del Empleado)")
    nombres: Optional[str] = Field(None, description="Nombres completos del docente")
    apellidos: Optional[str] = Field(None, description="Apellidos completos del docente")


class DocenteResponse(DocenteBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
