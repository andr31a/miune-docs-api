const prisma = require("../lib/prisma");

const includeRelations = {
  usuario: {
    select: {
      id: true,
      nombre: true,
      email: true,
      rol: true,
    },
  },
  categoria: {
    select: {
      id: true,
      nombre: true,
      descripcion: true,
    },
  },
};

const getAll = async (page = 1, pageSize = 10) => {
  const skip = (page - 1) * pageSize;
  const [documentos, total] = await Promise.all([
    prisma.documento.findMany({
      include: includeRelations,
      skip,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    }),
    prisma.documento.count(),
  ]);

  return {
    documentos,
    total,
    page,
    pageSize,
  };
};

const getById = async (id) => {
  return prisma.documento.findUnique({
    where: { id },
    include: includeRelations,
  });
};

const create = async (data) => {
  return prisma.documento.create({
    data,
    include: includeRelations,
  });
};

const update = async (id, data) => {
  const documentoExistente = await prisma.documento.findUnique({ where: { id } });

  if (!documentoExistente) {
    return null;
  }

  return prisma.documento.update({
    where: { id },
    data,
    include: includeRelations,
  });
};

const remove = async (id) => {
  const documentoExistente = await prisma.documento.findUnique({ where: { id } });

  if (!documentoExistente) {
    return false;
  }

  await prisma.documento.delete({ where: { id } });
  return true;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
