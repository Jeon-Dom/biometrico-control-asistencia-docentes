-- Tabla de Docentes
-- Almacena la información personal de los docentes y su identificador clave (CCUV) para el biométrico
CREATE TABLE docentes (
    id SERIAL PRIMARY KEY,
    ccuv VARCHAR(50) UNIQUE NOT NULL, -- Identificador clave que vincula con el sistema biométrico (Id del Empleado)
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Horarios
-- Gestiona los horarios de los docentes. Dado que pueden cambiar mensualmente,
-- se incluye mes y anio (o fecha de inicio y fin) para definir su vigencia.
CREATE TABLE horarios (
    id SERIAL PRIMARY KEY,
    docente_id INTEGER NOT NULL REFERENCES docentes(id) ON DELETE CASCADE,
    mes INTEGER NOT NULL, -- Mes de vigencia del horario (1-12)
    anio INTEGER NOT NULL, -- Año de vigencia
    dia_semana INTEGER NOT NULL, -- 1=Lunes, 7=Domingo
    hora_entrada TIME NOT NULL,
    hora_salida TIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Marcaciones
-- Almacena los registros de asistencia que coinciden con el formato del archivo CSV exportado por ZKTeco/BioTime
CREATE TABLE marcaciones (
    id SERIAL PRIMARY KEY,
    ccuv VARCHAR(50) NOT NULL REFERENCES docentes(ccuv) ON DELETE CASCADE, -- Vínculo directo usando CCUV
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    tipo_marcacion VARCHAR(50) NOT NULL, -- Ej: 'Entrada', 'Salida', 'Entrada Hora Extra', 'Salida Hora Extra'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices iniciales recomendados para optimizar las consultas más comunes
CREATE INDEX idx_docentes_ccuv ON docentes(ccuv);
CREATE INDEX idx_horarios_docente_mes_anio ON horarios(docente_id, mes, anio);
CREATE INDEX idx_marcaciones_ccuv_fecha ON marcaciones(ccuv, fecha);
