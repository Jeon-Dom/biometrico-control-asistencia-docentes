from sqlalchemy.orm import Session
from app.models.docente import Docente
from app.schemas.docente import DocenteCreate, DocenteUpdate

def get_docente(db: Session, docente_id: int):
    return db.query(Docente).filter(Docente.id == docente_id).first()

def get_docente_by_ccuv(db: Session, ccuv: str):
    return db.query(Docente).filter(Docente.ccuv == ccuv).first()

def get_docentes(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Docente).offset(skip).limit(limit).all()

def create_docente(db: Session, docente: DocenteCreate):
    db_docente = Docente(
        ccuv=docente.ccuv,
        nombres=docente.nombres,
        apellidos=docente.apellidos,
        tipo_dedicacion=docente.tipo_dedicacion
    )
    db.add(db_docente)
    db.commit()
    db.refresh(db_docente)
    return db_docente

def update_docente(db: Session, db_docente: Docente, docente_update: DocenteUpdate):
    update_data = docente_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_docente, key, value)
    
    db.commit()
    db.refresh(db_docente)
    return db_docente

def delete_docente(db: Session, db_docente: Docente):
    db.delete(db_docente)
    db.commit()
    return db_docente
