from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.schemas.docente import DocenteCreate, DocenteUpdate, DocenteResponse
from app.services.docente_service import DocenteService

router = APIRouter(
    prefix="/docentes",
    tags=["Docentes"]
)

@router.post("/", response_model=DocenteResponse, status_code=status.HTTP_201_CREATED)
def crear_docente(docente_in: DocenteCreate, db: Session = Depends(get_db)):
    """
    Registrar un nuevo docente en el sistema.
    Requiere: ccuv, nombres, apellidos.
    """
    return DocenteService.create_docente(db, docente_in)


@router.get("/", response_model=List[DocenteResponse])
def listar_docentes(skip: int = Query(0, ge=0), limit: int = Query(100, ge=1), db: Session = Depends(get_db)):
    """
    Mostrar todos los docentes registrados con paginación opcional.
    """
    return DocenteService.get_docentes(db, skip=skip, limit=limit)


@router.get("/{id}", response_model=DocenteResponse)
def buscar_docente_por_id(id: int, db: Session = Depends(get_db)):
    """
    Buscar un docente específico usando su ID interno de base de datos.
    """
    return DocenteService.get_docente(db, id)


@router.get("/ccuv/{ccuv}", response_model=DocenteResponse)
def buscar_docente_por_ccuv(ccuv: str, db: Session = Depends(get_db)):
    """
    Buscar un docente específico usando su CCUV (ID del Empleado).
    """
    return DocenteService.get_docente_by_ccuv(db, ccuv)


@router.put("/{id}", response_model=DocenteResponse)
def actualizar_docente(id: int, docente_in: DocenteUpdate, db: Session = Depends(get_db)):
    """
    Modificar los datos de un docente existente (nombres, apellidos o ccuv).
    """
    return DocenteService.update_docente(db, id, docente_in)


@router.delete("/{id}")
def eliminar_docente(id: int, db: Session = Depends(get_db)):
    """
    Eliminar un docente del sistema por su ID.
    (Nota: Se eliminarán en cascada sus horarios y marcaciones según las reglas de BD)
    """
    return DocenteService.delete_docente(db, id)
