import csv
import io

from sqlalchemy.orm import Session

from app.models.marcacion import Marcacion


def exportar_marcaciones(db: Session):

    registros = (
        db.query(Marcacion)
        .order_by(
            Marcacion.fecha,
            Marcacion.hora
        )
        .all()
    )

    output = io.StringIO()

    writer = csv.writer(output)

    writer.writerow([
        "Id",
        "CCUV",
        "Fecha",
        "Hora",
        "Tipo de Marcación"
    ])

    for registro in registros:
        writer.writerow([
            registro.id,
            registro.ccuv,
            registro.fecha,
            registro.hora,
            registro.tipo_marcacion
        ])

    return output.getvalue()