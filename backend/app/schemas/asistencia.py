from datetime import date, time, datetime

from pydantic import BaseModel, ConfigDict


class AsistenciaResponse(BaseModel):
    id: int
    ccuv: str
    fecha: date
    hora: time
    tipo_marcacion: str
    created_at: datetime | None = None

    model_config = ConfigDict(from_attributes=True)