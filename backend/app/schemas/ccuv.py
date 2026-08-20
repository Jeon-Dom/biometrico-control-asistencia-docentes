from pydantic import BaseModel


class DocenteCCUV(BaseModel):
    ccuv: str
    nombres: str
    apellidos: str