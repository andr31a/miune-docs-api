## PROMPTS UTILIZADOS - SEMANA 3

### Prompt 1: Diseño inicial del esquema
**Objetivo:** Diseñar un esquema relacional para módulo documental con PostgreSQL y Prisma.

**Prompt completo:**
```
Estoy desarrollando una API de gestión documental con Node.js/Express.
Necesito un esquema de Prisma con al menos 3 tablas relacionadas para:
1) Usuarios que crean documentos
2) Categorías para clasificar documentos
3) Documentos con estado y metadatos

Dame:
- Modelos con campos, tipos y relaciones
- Índices y constraints importantes
- Recomendaciones de escalabilidad
```

**Resultado obtenido:**
Propuesta inicial de modelos Usuario, Categoria y Documento con relaciones 1:N.

**Modificaciones realizadas:**
- Se mantuvo `tipo` y `estado` como String para compatibilidad con validaciones existentes.
- Se agregaron índices compuestos para consultas frecuentes (`estado`, `createdAt`).
- Se configuró `onDelete: Restrict` para proteger integridad referencial.

---

### Prompt 2: Implementación CRUD con Prisma en Express
**Objetivo:** Reemplazar almacenamiento en memoria por operaciones con Prisma Client.

**Prompt completo:**
```
Ayúdame a migrar un CRUD de documentos en Express desde array en memoria a Prisma.
Necesito:
- getAll con paginación
- getById
- create
- update
- delete
- include de relaciones usuario y categoría
- manejo básico de errores
```

**Resultado obtenido:**
Estructura de funciones CRUD usando Prisma Client.

**Modificaciones realizadas:**
- Se aplicó arquitectura existente por capas (`models`, `controllers`, `routes`).
- Se añadió validación de IDs numéricos con `AppError`.
- Se mantuvo formato de respuesta JSON consistente con el proyecto.

---

### Prompt 3: Seed de datos de prueba
**Objetivo:** Crear `prisma/seed.js` con datos mínimos requeridos y relaciones válidas.

**Prompt completo:**
```
Genera un seed de Prisma para Usuario, Categoria y Documento.
Requisitos:
- Al menos 5 registros por entidad principal
- Relaciones correctas
- Datos realistas
- Borrado inicial para evitar duplicados
```

**Resultado obtenido:**
Script de seed con inserciones masivas y vínculos entre tablas.

**Modificaciones realizadas:**
- Se ajustaron emails y URLs al contexto MiUNE.
- Se agregaron estados `borrador`, `publicado` y `archivado`.
- Se dejó limpieza previa con `deleteMany` en orden seguro por llaves foráneas.

---

### Prompt 4: Mejora de documentación
**Objetivo:** Actualizar README para cumplir checklist del entregable.

**Prompt completo:**
```
Genera un README para API Express + Prisma con:
- instalación paso a paso
- migraciones y seed
- endpoints
- diagrama mermaid de base de datos
```

**Resultado obtenido:**
Estructura de documentación completa para setup y uso.

**Modificaciones realizadas:**
- Se adaptaron ejemplos de endpoints al contrato real de esta API.
- Se agregó bloque de estado de cumplimiento del entregable semana 3.
- Se alineó la guía de instalación con scripts reales del package.json.
