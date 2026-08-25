from sqlalchemy import Column, Integer, String, DateTime, text
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database import Base


class Docente(Base):
    __tablename__ = "docentes"

    id = Column(Integer, primary_key=True, index=True)
    ccuv = Column(String(50), unique=True, index=True, nullable=False)
    nombres = Column(String(100), nullable=False)
    apellidos = Column(String(100), nullable=False)

    cedula = Column(String(20), nullable=True)
    correo = Column(String(150), nullable=True)
    tipo_jornada = Column(String(2), nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow, server_default=text("CURRENT_TIMESTAMP"))
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, server_default=text("CURRENT_TIMESTAMP"))

    # Relaciones (si las necesitas más adelante)
    # horarios = relationship("Horario", back_populates="docente", cascade="all, delete-orphan")
    # marcaciones = relationship("Marcacion", back_populates="docente", cascade="all, delete-orphan")