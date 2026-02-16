const errorHandler = (err, req, res, next) => {
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
