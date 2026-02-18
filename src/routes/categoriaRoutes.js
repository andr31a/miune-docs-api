const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/categoriaController");
const {
  validateCategoriaCreate,
  validateCategoriaUpdate,
} = require("../middleware/validation");

router
  .route("/")
  .get(categoriaController.getAll)
  .post(validateCategoriaCreate, categoriaController.create);

router
  .route("/:id")
  .get(categoriaController.getById)
  .put(validateCategoriaUpdate, categoriaController.update)
  .delete(categoriaController.deleteResource);

module.exports = router;