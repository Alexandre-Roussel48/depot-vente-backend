const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getSession(data) {
  try {
    const sessions = await prisma.session.findMany({
      where: data.id ? { id: +data.id } : {}, // If data.id exists, filter by id; otherwise, return all sessions
    });
    return sessions;
  } catch (error) {
    throw new Error(
      `Erreur serveur lors de la récupération des sessions: ${error.message}`
    );
  }
}

async function createSession(data) {
  try {
    await prisma.session.create({
      data: {
        ...(data.begin_date && { begin_date: data.begin_date }), // Include only if begin_date exists
        end_date: data.end_date,
        commission: data.commission,
        fees: data.fees,
      },
    });
  } catch (error) {
    throw new Error(
      `Erreur serveur lors de la création d'une session: ${error.message}`
    );
  }
}

async function updateSession(data) {
  try {
    await prisma.session.update({
      where: { id: data.id },
      data: {
        ...(data.begin_date && { begin_date: data.begin_date }), // Include only if begin_date exists
        ...(data.end_date && { end_date: data.end_date }), // Include only if end_date exists
        ...(data.commission && { commission: data.commission }), // Include only if commission exists
        ...(data.fees && { fees: data.fees }), // Include only if fees exists
      },
    });
  } catch (error) {
    throw new Error(
      `Erreur serveur lors de la mise à jour d'une session: ${error.message}`
    );
  }
}

async function deleteSession(data) {
  try {
    await prisma.session.delete({
      where: { id: data.id },
    });
  } catch (error) {
    throw new Error(
      `Erreur serveur lors de la suppression d'une session: ${error.message}`
    );
  }
}

module.exports = {
  getSession,
  createSession,
  updateSession,
  deleteSession,
};
