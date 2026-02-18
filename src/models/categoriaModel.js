const prisma = require("../lib/prisma");

const getAll = async () => {
  return prisma.categoria.findMany({
    orderBy: { nombre: "asc" },
    include: {
      _count: {
        select: { documentos: true },
      },
    },
  });
};

const getById = async (id) => {
  return prisma.categoria.findUnique({
    where: { id },
    include: {
      documentos: {
        orderBy: { createdAt: "desc" },
      },
      _count: {
        select: { documentos: true },
      },
    },
  });
};

const create = async (data) => {
  return prisma.categoria.create({ data });
};

const update = async (id, data) => {
  const categoriaExistente = await prisma.categoria.findUnique({ where: { id } });

  if (!categoriaExistente) {
    return null;
  }

  return prisma.categoria.update({
    where: { id },
    data,
  });
};

const remove = async (id) => {
  const categoriaExistente = await prisma.categoria.findUnique({
    where: { id },
    include: { _count: { select: { documentos: true } } },
  });

  if (!categoriaExistente) {
    return { deleted: false, reason: "not_found" };
  }

  if (categoriaExistente._count.documentos > 0) {
    return { deleted: false, reason: "has_documents" };
  }

  await prisma.categoria.delete({ where: { id } });
  return { deleted: true };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};