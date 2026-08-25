from datetime import date
from typing import Optional
import io

from fastapi import APIRouter, Depends, Query
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.asistencia import AsistenciaResponse
from app.services.asistencia_service import consultar_asistencia
from app.services.importacion_service import importar_marcaciones
from app.services.exportacion_service import exportar_marcaciones


router = APIRouter(
    prefix="/asistencia",
    tags=["Asistencia"]
)


# ---------------------------------------------------------
# CONSULTA GENERAL + FILTROS + ORDENAMIENTO
# ---------------------------------------------------------
@router.get(
    "",
    response_model=list[AsistenciaResponse]
)
def obtener_asistencia(
    ccuv: Optional[str] = Query(
        default=None,
        description="CCUV del docente"
    ),
    fecha_desde: Optional[date] = Query(
        default=None,
        description="Fecha inicial"
    ),
    fecha_hasta: Optional[date] = Query(
        default=None,
        description="Fecha final"
    ),
    tipo_marcacion: Optional[str] = Query(
        default=None,
        description="Tipo de marcación"
    ),
    tipo_jornada: Optional[str] = Query(
        default=None,
        description="Tipo de jornada: TC (Tiempo Completo) o MT (Medio Tiempo)"
    ),
    orden: str = Query(
        default="desc",
        pattern="^(asc|desc)$",
        description="Orden por fecha y hora"
    ),
    db: Session = Depends(get_db),
):
    return consultar_asistencia(
        db=db,
        ccuv=ccuv,
        fecha_desde=fecha_desde,
        fecha_hasta=fecha_hasta,
        tipo_marcacion=tipo_marcacion,
        tipo_jornada=tipo_jornada,
        orden=orden,
    )


# ---------------------------------------------------------
# IMPORTAR CSV → POSTGRESQL
# ---------------------------------------------------------
@router.post("/importar")
def importar_csv(
    db: Session = Depends(get_db),
):
    total = importar_marcaciones(db)

    return {
        "mensaje": "Importación realizada correctamente",
        "registros_importados": total
    }


# ---------------------------------------------------------
# EXPORTAR MARCACIONES
# ---------------------------------------------------------
@router.get("/exportar")
def exportar(
    db: Session = Depends(get_db),
):
    contenido = exportar_marcaciones(db)

    archivo = io.BytesIO(
        contenido.encode("utf-8")
    )

    return StreamingResponse(
        archivo,
        media_type="text/csv",
        headers={
            "Content-Disposition":
                "attachment; filename=marcaciones_exportadas.csv"
        }
    )


# ---------------------------------------------------------
# CONSULTA POR CCUV
# ---------------------------------------------------------
@router.get(
    "/{ccuv}",
    response_model=list[AsistenciaResponse]
)
def obtener_asistencia_por_ccuv(
    ccuv: str,
    db: Session = Depends(get_db),
):
    return consultar_asistencia(
        db=db,
        ccuv=ccuv,
    )