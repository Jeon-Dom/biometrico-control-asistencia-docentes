import csv
from pathlib import Path
from datetime import datetime

from sqlalchemy.orm import Session

from app.models.marcacion import Marcacion


CSV_PATH = (
    Path(__file__).resolve().parent.parent
    / "data"
    / "marcaciones.csv"
)


def importar_marcaciones(db: Session):

    if not CSV_PATH.exists():
        raise FileNotFoundError(
            f"No se encontró el archivo: {CSV_PATH}"
        )

    registros_importados = 0

    try:
        with open(
            CSV_PATH,
            mode="r",
            encoding="utf-8-sig",
            newline=""
        ) as archivo:

            lector = csv.DictReader(archivo)

            for fila in lector:

                marcacion = Marcacion(
                    ccuv=fila["Id del Empleado"].strip(),
                    fecha=datetime.strptime(
                        fila["Fecha"].strip(),
                        "%Y-%m-%d"
                    ).date(),
                    hora=datetime.strptime(
                        fila["Hora"].strip(),
                        "%H:%M"
                    ).time(),
                    tipo_marcacion=fila[
                        "Tipo de Marcación"
                    ].strip(),
                )

                db.add(marcacion)
                registros_importados += 1

        db.commit()

        return registros_importados

    except Exception:
        db.rollback()
        raise