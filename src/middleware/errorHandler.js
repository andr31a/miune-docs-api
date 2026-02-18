const errorHandler = (err, req, res, next) => {
  if (err.code === "P2002") {
    return res.status(409).json({
      success: false,
      error: `Valor duplicado para el campo único: ${err.meta?.target?.join(", ") || "campo"}`,
    });
  }

  if (err.code === "P2003") {
    return res.status(400).json({
      success: false,
      error: "La relación referenciada no existe o viola una restricción",
    });
  }

  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Error Interno del Servidor";

  // Formato de respuesta consistente
  res.status(err.statusCode).json({
    success: false,
    error: err.message,
    // Solo mostramos la traza del error si estamos en modo desarrollo
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandler;
