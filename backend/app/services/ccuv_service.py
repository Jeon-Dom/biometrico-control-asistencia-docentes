import csv
from pathlib import Path
from typing import Optional


CSV_PATH = (
    Path(__file__).resolve().parent.parent
    / "data"
    / "marcaciones.csv"
)


def consultar_ccuv(ccuv: str) -> Optional[dict]:
    """
    Consulta la información de un docente utilizando
    el CCUV como identificador.
    """

    with open(
        CSV_PATH,
        mode="r",
        encoding="utf-8-sig",
        newline=""
    ) as archivo:

        lector = csv.DictReader(archivo)

        for fila in lector:
            if fila["Id del Empleado"] == str(ccuv):

                return {
                    "ccuv": fila["Id del Empleado"],
                    "nombres": fila["Nombres"],
                    "apellidos": fila["Apellidos"],
                }

    return None