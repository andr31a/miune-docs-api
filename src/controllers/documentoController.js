const documentoModel = require("../models/documentoModel");

// @desc    Obtener todos los documentos
// @route   GET /api/documentos
exports.getAll = async (req, res, next) => {
  try {
    const documentos = await documentoModel.getAll();
    res.status(200).json({
      success: true,
      count: documentos.length,
      data: documentos,
    });
  } catch (error) {
    next(error); // Pasamos el error al middleware global (que crearemos luego)
  }
};

// @desc    Obtener un documento por ID
// @route   GET /api/documentos/:id
exports.getById = async (req, res, next) => {
  try {
    const documento = await documentoModel.getById(req.params.id);

    if (!documento) {
      return res.status(404).json({
        success: false,
        message: `Documento no encontrado con el id ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: documento,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Crear un nuevo documento
// @route   POST /api/documentos
exports.create = async (req, res, next) => {
  try {
    // Por ahora confiamos en el body, en el próximo paso validaremos con Joi
    const nuevoDocumento = await documentoModel.create(req.body);

    res.status(201).json({
      success: true,
      data: nuevoDocumento,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Actualizar un documento existente
// @route   PUT /api/documentos/:id
exports.update = async (req, res, next) => {
  try {
    const documentoActualizado = await documentoModel.update(
      req.params.id,
      req.body,
    );

    if (!documentoActualizado) {
      return res.status(404).json({
        success: false,
        message: `Documento no encontrado con el id ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: documentoActualizado,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Eliminar un documento
// @route   DELETE /api/documentos/:id
exports.deleteResource = async (req, res, next) => {
  try {
    const eliminado = await documentoModel.remove(req.params.id);

    if (!eliminado) {
      return res.status(404).json({
        success: false,
        message: `Documento no encontrado con el id ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: {}, // Al eliminar, es convención devolver un objeto vacío o un mensaje
    });
  } catch (error) {
    next(error);
  }
};
