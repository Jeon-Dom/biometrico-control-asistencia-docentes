from fastapi import APIRouter, HTTPException, Query

from app.schemas.asistencia import Asistencia
from app.services.asistencia_service import obtener_asistencia


router = APIRouter(
    prefix="/asistencia",
    tags=["Asistencia"]
)


@router.get(
    "/{id_empleado}",
    response_model=Asistencia
)
def consultar_asistencia(
    id_empleado: str,
    fecha: str = Query(..., description="Fecha en formato YYYY-MM-DD")
):
    asistencia = obtener_asistencia(id_empleado, fecha)

    if asistencia is None:
        raise HTTPException(
            status_code=404,
            detail="No se encontraron marcaciones para el empleado y fecha indicados"
        )

    return asistencia