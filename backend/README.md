# Backend - Sistema de Control de Asistencia Docente

Backend del proyecto **Sistema de Control de Asistencia Docente mediante Biométrico ZKTeco**, desarrollado con Python y FastAPI.

## Tecnologías

- Python
- FastAPI
- Uvicorn
- Python Dotenv
- API REST
- Swagger / OpenAPI

## Estructura del backend

```text
backend/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── api/
│   │   └── __init__.py
│   ├── core/
│   │   ├── __init__.py
│   │   └── config.py
│   ├── models/
│   │   └── __init__.py
│   ├── schemas/
│   │   └── __init__.py
│   └── services/
│       └── __init__.py
├── .env.example
├── .gitignore
├── requirements.txt
└── README.md
```

## Configuración del proyecto

### 1. Crear entorno virtual

Desde la carpeta `backend`:

```bash
python -m venv venv
```

### 2. Activar entorno virtual

En Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

### 3. Instalar dependencias

```bash
pip install -r requirements.txt
```

### 4. Configurar variables de entorno

Crear un archivo `.env` tomando como referencia `.env.example`.

Ejemplo:

```env
APP_NAME=Sistema de Control de Asistencia Docente
APP_VERSION=1.0.0
DEBUG=True
FRONTEND_URL=http://localhost:4200
```

El archivo `.env` no debe subirse al repositorio.

## Ejecutar el backend

Desde la carpeta `backend`:

```bash
uvicorn app.main:app --reload
```

El servidor estará disponible en:

```text
http://127.0.0.1:8000
```

## Endpoint de prueba

### GET /

Permite comprobar que la API está funcionando correctamente.

Respuesta esperada:

```json
{
  "message": "API de Control de Asistencia Docente funcionando correctamente",
  "version": "1.0.0"
}
```

## Documentación de la API

FastAPI genera automáticamente la documentación interactiva con Swagger.

```text
http://127.0.0.1:8000/docs
```

También se encuentra disponible el esquema OpenAPI:

```text
http://127.0.0.1:8000/openapi.json
```

## CORS

El backend está preparado para permitir la comunicación con el frontend Angular durante el desarrollo mediante:

```text
http://localhost:4200
```

## Estado actual

Primera configuración del backend completada:

- FastAPI configurado.
- Servidor Uvicorn funcionando.
- Endpoint de prueba disponible.
- Documentación Swagger disponible.
- CORS preparado para Angular.
- Variables de entorno configuradas.
- Arquitectura base organizada para continuar el desarrollo.