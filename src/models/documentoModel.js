const crypto = require("node:crypto"); // Módulo nativo para generar UUIDs

// 1. Seed Data (Datos de prueba iniciales)
let documentos = [
  {
    id: crypto.randomUUID(),
    titulo: "Manual de Usuario MiUNE 2.0",
    tipo: "application/pdf",
    peso: "2.5MB",
    estado: "publicado",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    titulo: "Reporte de Gestión 2025",
    tipo: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    peso: "1.2MB",
    estado: "borrador",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    titulo: "Normativas de Pasantías",
    tipo: "application/pdf",
    peso: "500KB",
    estado: "publicado",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// 2. Funciones CRUD (Simulando asincronía con async/await)

// Obtener todos los documentos
const getAll = async () => {
  return documentos;
};

// Obtener un documento por ID
const getById = async (id) => {
  const documento = documentos.find((doc) => doc.id === id);
  return documento || null;
};

// Crear un nuevo documento
const create = async (data) => {
  const nuevoDocumento = {
    id: crypto.randomUUID(),
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  documentos.push(nuevoDocumento);
  return nuevoDocumento;
};

// Actualizar un documento existente
const update = async (id, data) => {
  const index = documentos.findIndex((doc) => doc.id === id);

  if (index === -1) {
    return null; // No encontrado
  }

  // Actualizamos solo los campos enviados y refrescamos updatedAt
  documentos[index] = {
    ...documentos[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };

  return documentos[index];
};

// Eliminar un documento (físico)
const remove = async (id) => {
  const index = documentos.findIndex((doc) => doc.id === id);

  if (index === -1) {
    return false; // No encontrado
  }

  // Elimina 1 elemento en la posición index
  documentos.splice(index, 1);
  return true;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
