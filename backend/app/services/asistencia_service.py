import csv
from pathlib import Path
from typing import Optional


CSV_PATH = (
    Path(__file__).resolve().parent.parent
    / "data"
    / "marcaciones.csv"
)


def obtener_asistencia(
    id_empleado: str,
    fecha: str
) -> Optional[dict]:
    """
    Obtiene la asistencia de un empleado para una fecha
    determinada a partir del archivo de marcaciones.
    """

    marcaciones = []

    with open(
        CSV_PATH,
        mode="r",
        encoding="utf-8-sig",
        newline=""
    ) as archivo:
        lector = csv.DictReader(archivo)

        for fila in lector:
            if (
                fila["Id del Empleado"] == str(id_empleado)
                and fila["Fecha"] == fecha
            ):
                marcaciones.append(fila)

    if not marcaciones:
        return None

    primera = marcaciones[0]

    asistencia = {
        "id_empleado": primera["Id del Empleado"],
        "nombres": primera["Nombres"],
        "apellidos": primera["Apellidos"],
        "fecha": primera["Fecha"],
        "entrada": None,
        "salida": None,
        "entrada_hora_extra": None,
        "salida_hora_extra": None,
    }

    for marcacion in marcaciones:
        tipo = marcacion["Tipo de Marcación"]
        hora = marcacion["Hora"]

        if tipo == "Entrada":
            asistencia["entrada"] = hora

        elif tipo == "Salida":
            asistencia["salida"] = hora

        elif tipo == "Entrada Hora Extra":
            asistencia["entrada_hora_extra"] = hora

        elif tipo == "Salida Hora Extra":
            asistencia["salida_hora_extra"] = hora

    return asistencia