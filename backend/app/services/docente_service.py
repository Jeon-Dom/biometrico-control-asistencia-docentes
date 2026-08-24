from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, status
from typing import List

from app.models.docente import Docente
from app.schemas.docente import DocenteCreate, DocenteUpdate


class DocenteService:
    @staticmethod
    def create_docente(db: Session, docente_in: DocenteCreate) -> Docente:
        db_docente = Docente(
            ccuv=docente_in.ccuv,
            nombres=docente_in.nombres,
            apellidos=docente_in.apellidos
        )
        try:
            db.add(db_docente)
            db.commit()
            db.refresh(db_docente)
            return db_docente
        except IntegrityError:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"El docente con CCUV {docente_in.ccuv} ya existe."
            )

    @staticmethod
    def get_docentes(db: Session, skip: int = 0, limit: int = 100) -> List[Docente]:
        return db.query(Docente).offset(skip).limit(limit).all()

    @staticmethod
    def get_docente(db: Session, docente_id: int) -> Docente:
        docente = db.query(Docente).filter(Docente.id == docente_id).first()
        if not docente:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Docente con ID {docente_id} no encontrado."
            )
        return docente
        
    @staticmethod
    def get_docente_by_ccuv(db: Session, ccuv: str) -> Docente:
        docente = db.query(Docente).filter(Docente.ccuv == ccuv).first()
        if not docente:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Docente con CCUV {ccuv} no encontrado."
            )
        return docente

    @staticmethod
    def update_docente(db: Session, docente_id: int, docente_in: DocenteUpdate) -> Docente:
        db_docente = DocenteService.get_docente(db, docente_id)
        
        update_data = docente_in.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_docente, field, value)
            
        try:
            db.add(db_docente)
            db.commit()
            db.refresh(db_docente)
            return db_docente
        except IntegrityError:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Error de integridad. Es posible que el nuevo CCUV ya esté en uso."
            )

    @staticmethod
    def delete_docente(db: Session, docente_id: int) -> dict:
        db_docente = DocenteService.get_docente(db, docente_id)
        db.delete(db_docente)
        db.commit()
        return {"message": f"Docente con ID {docente_id} eliminado exitosamente."}
