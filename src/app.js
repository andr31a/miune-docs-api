const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const documentoRoutes = require("./routes/documentoRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/documentos", documentoRoutes);

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Bienvenido a la API del Módulo Documental MiUNE 2.0" });
});

app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Ruta no encontrada" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Servidor corriendo en modo ${process.env.NODE_ENV} en el puerto ${PORT}`,
  );
});
