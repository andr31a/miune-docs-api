const Joi = require("joi");
const AppError = require("../utils/AppError");

// Esquema base para los documentos
const documentoSchema = Joi.object({
  titulo: Joi.string().min(3).max(150).required().messages({
    "string.empty": "El título no puede estar vacío",
    "string.min": "El título debe tener al menos 3 caracteres",
    "any.required": "El título es obligatorio",
  }),
  tipo: Joi.string()
    .valid("application/pdf", "application/docx", "application/xlsx")
    .required()
    .messages({
      "any.only": "El tipo debe ser pdf, docx o xlsx",
      "any.required": "El tipo de archivo es obligatorio",
    }),
  peso: Joi.string().required().messages({
    "any.required": "El peso del archivo es obligatorio",
  }),
  estado: Joi.string().valid("borrador", "publicado", "archivado").required(),
  resumen: Joi.string().max(500).optional().allow(""),
  urlArchivo: Joi.string().uri().optional().allow(""),
  usuarioId: Joi.number().integer().positive().required().messages({
    "any.required": "El usuarioId es obligatorio",
  }),
  categoriaId: Joi.number().integer().positive().required().messages({
    "any.required": "El categoriaId es obligatorio",
  }),
});

const categoriaSchema = Joi.object({
  nombre: Joi.string().min(3).max(80).required().messages({
    "string.empty": "El nombre no puede estar vacío",
    "string.min": "El nombre debe tener al menos 3 caracteres",
    "any.required": "El nombre es obligatorio",
  }),
  descripcion: Joi.string().max(255).optional().allow(""),
  activa: Joi.boolean().optional(),
});

// Middleware para validar creación (POST)
const validateCreate = (req, res, next) => {
  const { error } = documentoSchema.validate(req.body, { abortEarly: false });

  if (error) {
    // Extraemos todos los mensajes de error de Joi y los unimos
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return next(new AppError(errorMessage, 400));
  }
  next();
};

// Middleware para validar actualización (PUT)
const validateUpdate = (req, res, next) => {
  // Al actualizar, todos los campos son opcionales, pero si vienen deben cumplir las reglas
  const updateSchema = documentoSchema.fork(
    [
      "titulo",
      "tipo",
      "peso",
      "estado",
      "resumen",
      "urlArchivo",
      "usuarioId",
      "categoriaId",
    ],
    (schema) => schema.optional(),
  );

  const { error } = updateSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return next(new AppError(errorMessage, 400));
  }
  next();
};

const validateCategoriaCreate = (req, res, next) => {
  const { error } = categoriaSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return next(new AppError(errorMessage, 400));
  }

  next();
};

const validateCategoriaUpdate = (req, res, next) => {
  const updateSchema = categoriaSchema.fork(["nombre", "descripcion", "activa"], (schema) =>
    schema.optional(),
  );

  const { error } = updateSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return next(new AppError(errorMessage, 400));
  }

  next();
};

module.exports = {
  validateCreate,
  validateUpdate,
  validateCategoriaCreate,
  validateCategoriaUpdate,
};
