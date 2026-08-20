# Backend - Sistema de Control de Asistencia Docente

Backend del proyecto **Sistema de Control de Asistencia Docente mediante Biométrico ZKTeco**, desarrollado con Python y FastAPI.

## Tecnologías

- Python
- FastAPI
- Uvicorn
- PostgreSQL
- SQLAlchemy
- psycopg2
- Python Dotenv
- API REST
- Swagger / OpenAPI

## Estructura del backend

```text
backend/
├── app/
│   ├── __init__.py
│   ├── main.py
│   │
│   ├── api/
│   │   ├── __init__.py
│   │   └── routes/
│   │       └── __init__.py
│   │
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py
│   │   └── exceptions.py
│   │
│   ├── database/
│   │   ├── __init__.py
│   │   └── database.py
│   │
│   ├── models/
│   │   └── __init__.py
│   │
│   ├── repositories/
│   │   └── __init__.py
│   │
│   ├── schemas/
│   │   └── __init__.py
│   │
│   ├── services/
│   │   └── __init__.py
│   │
│   └── data/
│       └── marcaciones.csv
│
├── .env.example
├── .gitignore
├── requirements.txt
└── README.md
```

La arquitectura separa las responsabilidades del backend en rutas, servicios, repositorios, modelos, esquemas, configuración y acceso a base de datos.

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
DATABASE_URL=postgresql://postgres:CONTRASENA@localhost:5432/asistencia_docentes
```

La contraseña debe corresponder a la configuración local de PostgreSQL.

El archivo `.env` contiene información de configuración local y no debe subirse al repositorio.

## Configuración de base de datos

La conexión con PostgreSQL se realiza mediante SQLAlchemy.

En `app/database/database.py` se encuentran configurados:

- `Engine`: administra la conexión con PostgreSQL.
- `SessionLocal`: permite crear sesiones para realizar operaciones sobre la base de datos.
- `Base`: clase base para los modelos que utilizarán SQLAlchemy.
- `get_db()`: administra la apertura y cierre de las sesiones de base de datos.

La conexión se obtiene mediante la variable `DATABASE_URL` definida en el archivo `.env`.

## Manejo de excepciones

El archivo:

```text
app/core/exceptions.py
```

contiene excepciones reutilizables para manejar situaciones comunes del backend, como:

- Errores de conexión con la base de datos.
- Recursos no encontrados.
- Datos de entrada no válidos.

Esto permite mantener un manejo de errores organizado para los diferentes módulos de la API.

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

FastAPI genera automáticamente la documentación interactiva con Swagger:

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

La configuración base del backend se encuentra preparada para continuar con el desarrollo de los diferentes módulos:

- FastAPI configurado.
- Servidor Uvicorn funcionando.
- PostgreSQL configurado para el entorno local.
- SQLAlchemy integrado.
- Engine configurado.
- SessionLocal configurado.
- Base de SQLAlchemy configurada.
- Gestión de sesiones mediante `get_db()`.
- Variables de entorno configuradas.
- Manejo básico de excepciones preparado.
- CORS preparado para la integración con Angular.
- Swagger / OpenAPI disponible.
- Arquitectura organizada por capas para continuar con el desarrollo.