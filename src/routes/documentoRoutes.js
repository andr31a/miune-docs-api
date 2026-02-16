const express = require("express");
const router = express.Router();
const documentoController = require("../controllers/documentoController");
const { validateCreate, validateUpdate } = require("../middleware/validation");

router
  .route("/")
  .get(documentoController.getAll)
  // Agregamos la validación ANTES del controlador
  .post(validateCreate, documentoController.create);

router
  .route("/:id")
  .get(documentoController.getById)
  // Agregamos la validación ANTES del controlador
  .put(validateUpdate, documentoController.update)
  .delete(documentoController.deleteResource);

module.exports = router;
