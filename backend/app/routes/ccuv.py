from fastapi import APIRouter, HTTPException

from app.schemas.ccuv import DocenteCCUV
from app.services.ccuv_service import consultar_ccuv


router = APIRouter(
    prefix="/ccuv",
    tags=["CCUV"]
)


@router.get(
    "/{ccuv}",
    response_model=DocenteCCUV
)
def obtener_docente_por_ccuv(ccuv: str):

    docente = consultar_ccuv(ccuv)

    if docente is None:
        raise HTTPException(
            status_code=404,
            detail="No se encontró un docente asociado al CCUV indicado"
        )

    return docente