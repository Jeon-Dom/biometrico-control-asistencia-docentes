from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.schemas.docente import DocenteCreate, DocenteResponse, DocenteUpdate
from app.services import docente_service
from app.core.database import get_db

router = APIRouter()

@router.post("/", response_model=DocenteResponse, status_code=status.HTTP_201_CREATED)
def create_docente(docente: DocenteCreate, db: Session = Depends(get_db)):
    db_docente = docente_service.get_docente_by_ccuv(db, ccuv=docente.ccuv)
    if db_docente:
        raise HTTPException(status_code=400, detail="El CCUV ya está registrado")
    return docente_service.create_docente(db=db, docente=docente)


@router.get("/", response_model=List[DocenteResponse])
def read_docentes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    docentes = docente_service.get_docentes(db, skip=skip, limit=limit)
    return docentes


@router.get("/{id}", response_model=DocenteResponse)
def read_docente(id: int, db: Session = Depends(get_db)):
    db_docente = docente_service.get_docente(db, docente_id=id)
    if db_docente is None:
        raise HTTPException(status_code=404, detail="Docente no encontrado")
    return db_docente


@router.get("/ccuv/{ccuv}", response_model=DocenteResponse)
def read_docente_by_ccuv(ccuv: str, db: Session = Depends(get_db)):
    db_docente = docente_service.get_docente_by_ccuv(db, ccuv=ccuv)
    if db_docente is None:
        raise HTTPException(status_code=404, detail="Docente no encontrado")
    return db_docente


@router.put("/{id}", response_model=DocenteResponse)
def update_docente(id: int, docente_update: DocenteUpdate, db: Session = Depends(get_db)):
    db_docente = docente_service.get_docente(db, docente_id=id)
    if db_docente is None:
        raise HTTPException(status_code=404, detail="Docente no encontrado")
    
    # Check if they are trying to update to an existing CCUV
    if docente_update.ccuv and docente_update.ccuv != db_docente.ccuv:
        existing_docente = docente_service.get_docente_by_ccuv(db, ccuv=docente_update.ccuv)
        if existing_docente:
            raise HTTPException(status_code=400, detail="El nuevo CCUV ya está registrado en otro docente")
            
    return docente_service.update_docente(db=db, db_docente=db_docente, docente_update=docente_update)


@router.delete("/{id}", response_model=DocenteResponse)
def delete_docente(id: int, db: Session = Depends(get_db)):
    db_docente = docente_service.get_docente(db, docente_id=id)
    if db_docente is None:
        raise HTTPException(status_code=404, detail="Docente no encontrado")
    return docente_service.delete_docente(db=db, db_docente=db_docente)
