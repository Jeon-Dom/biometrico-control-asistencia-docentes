from sqlalchemy import Column, Integer, String, Date, Time, DateTime
from sqlalchemy.sql import func

from app.database import Base


class Marcacion(Base):
    __tablename__ = "marcaciones"

    id = Column(Integer, primary_key=True, index=True)
    ccuv = Column(
        String(50),
        nullable=False,
        index=True
    )
    fecha = Column(Date, nullable=False)
    hora = Column(Time, nullable=False)
    tipo_marcacion = Column(String(50), nullable=False)
    created_at = Column(
        DateTime,
        server_default=func.now()
    )