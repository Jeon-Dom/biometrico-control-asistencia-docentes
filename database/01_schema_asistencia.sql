-- Tabla de Docentes
-- Almacena la información personal de los docentes y su identificador clave (CCUV) para el biométrico
CREATE TABLE docentes (
    id SERIAL PRIMARY KEY,
    ccuv VARCHAR(50) UNIQUE NOT NULL, -- Identificador clave que vincula con el sistema biométrico (Id del Empleado)
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    cedula VARCHAR(20),
    correo VARCHAR(150),
    tipo_jornada VARCHAR(2),
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


-- Insertando docentes necesarios para evitar error de Llave Foranea con el CSV

-- Inserción automática de docentes detectados en el CSV
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('1', 'DAICY DE LOS ANGELES', 'ACELDO RODRIGUEZ') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('10', 'SOFIA ALEXANDRA', 'BOHORQUEZ VALENCIA') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('100', 'MARIA EDELINA', 'VILLAGRAN OLIVO') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('101', 'JENNY PATRICIA', 'VILLARROEL TUSTON') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('103', 'MARIA CRISTINA', 'VIZCAINO NARVAEZ') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('104', 'DAVID ALEJANDRO', 'VIZUETE AREVALO') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('105', 'DIEGO ALEXANDER', 'YANEZ FLORES') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('106', 'ANA BELEN', 'ZALDUMBIDE VIZCAINO') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('107', 'MARIA DE LOS ANGELES', 'PAVON CORDOVA') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('109', 'FLOR MARIA', 'TAYUPANTA LOPEZ') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('110', 'Erika Liliana', 'Arias Coro') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('111', 'Angel Javier', 'Anacleto Medina') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('12', 'ANDRÉS SEBASTIAN', 'CAÑIZARES NARANJO') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('13', 'ELIZABETH ALEJANDRA', 'CARDENAS DUQUE') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('14', 'CARLOS ANDRES', 'CARRION DAQUILEMA') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('15', 'ANDRES FRANCISCO', 'CARVAJAL PROAÑO') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('16', 'KARINA DEL PILAR', 'CASTILLO HARO') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('17', 'GABRIELA CATALINA', 'CASTRO SUAREZ') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('18', 'ANA CRISTINA', 'CHANGO SIMBAÑA') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('19', 'FREDDY DANIEL', 'CHILIG COLLAGUAZO') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('2', 'MICHELLE KATHERINE', 'AGUIRRE PINTADO') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('20', 'LUIS ANIBAL', 'CHIPUXI FAJARDO') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('21', 'GABRIELA ALEXANDRA', 'CORAL REYES') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('22', 'PATRICIO RENAN', 'CORELLA ARROBA') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('23', 'CINTIA CAROLINA', 'CRUZ BAEZ') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('25', 'VIVIANA JANETH', 'CUATIN CARPIO') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('26', 'GEOVANNY JAVIER', 'CUJANO GUACHI') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('27', 'ANA GABRIELA', 'CUNGUAN ALBUJA') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('28', 'DANIELA ELIZABETH', 'CUPUERAN ANDRADE') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('29', 'DIEGO SEBASTIAN', 'DARQUEA ARGUERO') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('3', 'JUAN FRANCISCO', 'ALVARO COCHAMBAY') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('30', 'NATHALY', 'DURAND REINAGA') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('31', 'ADRIAN RAFAEL', 'EGAS HUERTA') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('32', 'DANILO LENIN', 'ESTEVEZ TERAN') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('33', 'PAOLA FERNANDA', 'FACTOS GUAYASAMIN') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('34', 'NADIA KARINA', 'FALCONI ESTRADA') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('35', 'CARMEN RAMONA', 'FARIAS MOREIRA') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('36', 'JONNY ERNESTO', 'FRANCO MUÑOZ') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('37', 'LILIANA KATHERINE', 'GALARZA GONZALEZ') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('39', 'MARCIA ELIZABETH', 'GARCIA ORTIZ') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('40', 'JAIME EDUARDO', 'GARCIA ZAPATA') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('41', 'ANDRES VINICIO', 'GONZALEZ CASTRO') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('42', 'CARLA STEPHANIE', 'GONZALEZ LOPEZ') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('43', 'ALEXANDRA PATRICIA', 'GORDON MUÑOZ') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('44', 'MARIA ISABEL', 'GUACHO TIPAN') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('45', 'MAURICIO ALEJANDRO', 'GUAMAN CHANGO') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('46', 'CARMEN AMELIA', 'GUATEMAL ANRANGO') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('47', 'SANDRA PAOLA', 'GUIZADO ESPINOSA') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('48', 'MAYRA ALEJANDRA', 'HERNANDEZ NOROÑA') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('49', 'VERONICA ALEXANDRA', 'HERRERA FLORES') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('5', 'MARIA DEL CARMEN', 'ANDRANGO MORETA') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('51', 'CHANDY MIKAELI', 'LOPEZ ACURIO') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('52', 'JOMAIRA ROCIO', 'LUGMAÑA OTO') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('53', 'MARIA ELIZABETH', 'MAILA QUINGA') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('54', 'JULIA LORENA', 'MALDONADO MORENO') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('55', 'JUAN DOENITZ', 'MARTINEZ GUEVARA') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('56', 'CRISTIAN HERNAN', 'MEJIA HINOJOSA') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('57', 'KAREN YEMIMA', 'MENDIETA ZAMBRANO') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('58', 'DEBORA ELIZABETH', 'MERA CASTILLO') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('6', 'MARCELO VINICIO', 'ARGOTI PAEZ') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('60', 'FRANCISCO FABIAN', 'MONTERO ESTACIO') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('61', 'BYRON RODRIGO', 'MORENO MORENO') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('62', 'DIEGO JAVIER', 'MOSQUERA IZURIETA') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('63', 'YOLANDA ELIZABETH', 'MOYA CARRERA') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('64', 'MIGUEL ALONZO', 'MUÑOZ DE LA TORRE') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('65', 'FRANKS DAVID', 'MUÑOZ PAREDES') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('66', 'LUIS DARIO', 'NIETO PICO') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('67', 'ANTONELLA MARIVEL', 'NOVOA MEDINA') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('68', 'MARUJA ISMERIA', 'ORTEGA GARZON') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('69', 'RAUL ALEJANDRO', 'PAEZ ANDRADE') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('70', 'LENIN MAURICIO', 'PAREDES PEREZ') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('71', 'CRISTINA VANNESSA', 'PAVON QUINATOA') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('72', 'GEOVANNI WLADIMIR', 'PAZMIÑO SALAZAR') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('73', 'SANTIAGO MAXIMILIANO', 'PAZOS CARRILLO') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('74', 'CONSUELO DEL PILAR', 'PILLAJO GUAILLAS') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('75', 'LUIS DIEGO', 'PILLAJO TUFIÑO') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('76', 'SOFIA GABRIELA', 'PINTO MOLINA') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('77', 'EVELYN CATALINA', 'PROAÑO GARCES') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('78', 'RUTH ELIZABETH', 'QUIGUANGO DELGADO') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('79', 'SIGRID MARIA', 'RODRIGUEZ CABRERA') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('80', 'VERONICA JACQUELINE', 'RODRIGUEZ HERNANDEZ') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('81', 'MIRYAM PAOLA TAMARA', 'ROMERO RAMIREZ') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('82', 'PABLO XAVIER', 'SAENZ QUIMBIULCO') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('83', 'MYRIAM CECILIA', 'SAMPEDRO REDROBAN') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('84', 'FANNY GUADALUPE', 'SANCHEZ CALI') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('85', 'DIEGO DAVID', 'SANTILLAN ALVAREZ') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('86', 'FAUSTO RAMIRO', 'SARRIA GUAÑA') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('87', 'MARIA FERNANDA', 'SEGOVIA BARAHONA') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('88', 'LUIS ALFREDO', 'SOSA MALLA') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('89', 'ALEX FERNANDO', 'SUAREZ PEREZ') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('9', 'VICENTE ALEJANDRO', 'ARROYO HUERTA') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('90', 'CESAR MAURICIO', 'TAMAYO LOPEZ') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('91', 'AMPARO DEL CONSUELO', 'TAYUPANTA LOPEZ') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('93', 'ROLANDO AMILCAR', 'TORRES CARRERA') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('94', 'CARLA ESTEFANIA', 'VALENCIA VALENCIA') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('95', 'CYNTHIA CAROLINA', 'VALVERDE JACOME') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('96', 'EDDY REYNALDO', 'VARGAS CARVAJAL') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('97', 'MARIA TERESA', 'VERA CABRERA') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('98', 'GEOVANNY MAURICIO', 'VERDEZOTO BOSQUEZ') ON CONFLICT (ccuv) DO NOTHING;
INSERT INTO docentes (ccuv, nombres, apellidos) VALUES ('99', 'LUIS PATRICIO', 'VICENTE GUTIERREZ') ON CONFLICT (ccuv) DO NOTHING;
