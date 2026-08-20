from datetime import date
from typing import Optional

from sqlalchemy.orm import Session
from sqlalchemy import asc, desc

from app.models.marcacion import Marcacion


def consultar_asistencia(
    db: Session,
    ccuv: Optional[str] = None,
    fecha_desde: Optional[date] = None,
    fecha_hasta: Optional[date] = None,
    tipo_marcacion: Optional[str] = None,
    orden: str = "desc",
):
    query = db.query(Marcacion)

    if ccuv:
        query = query.filter(Marcacion.ccuv == ccuv)

    if fecha_desde:
        query = query.filter(Marcacion.fecha >= fecha_desde)

    if fecha_hasta:
        query = query.filter(Marcacion.fecha <= fecha_hasta)

    if tipo_marcacion:
        query = query.filter(
            Marcacion.tipo_marcacion == tipo_marcacion
        )

    if orden.lower() == "asc":
        query = query.order_by(
            asc(Marcacion.fecha),
            asc(Marcacion.hora)
        )
    else:
        query = query.order_by(
            desc(Marcacion.fecha),
            desc(Marcacion.hora)
        )

    return query.all()