from fastapi import HTTPException, status


class DatabaseConnectionException(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="No se pudo establecer conexión con la base de datos"
        )


class ResourceNotFoundException(HTTPException):
    def __init__(self, resource: str = "Recurso"):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"{resource} no encontrado"
        )


class InvalidDataException(HTTPException):
    def __init__(self, detail: str = "Los datos proporcionados no son válidos"):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=detail
        )