const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getGame(data) {
  try {
    const games = await prisma.game.findMany({
      where: data.id ? { id: +data.id } : {}, // If data.id exists, filter by id; otherwise, return all games
    });
    return games;
  } catch (error) {
    throw new Error(
      `Erreur serveur lors de la récupération des jeux: ${error.message}`
    );
  }
}

async function createGame(data) {
  try {
    await prisma.game.create({
      data: {
        name: data.name,
        editor: data.editor,
      },
    });
  } catch (error) {
    throw new Error(
      `Erreur serveur lors de la création d'un jeu: ${error.message}`
    );
  }
}

async function updateGame(data) {
  try {
    await prisma.game.update({
      where: { id: data.id },
      data: {
        ...(data.name && { name: data.name }), // Include only if name exists
        ...(data.editor && { editor: data.editor }), // Include only if editor exists
      },
    });
  } catch (error) {
    throw new Error(
      `Erreur serveur lors de la mise à jour d'un jeu: ${error.message}`
    );
  }
}

async function deleteGame(data) {
  try {
    await prisma.game.delete({
      where: { id: data.id },
    });
  } catch (error) {
    throw new Error(
      `Erreur serveur lors de la suppression d'un jeu: ${error.message}`
    );
  }
}

module.exports = {
  getGame,
  createGame,
  updateGame,
  deleteGame,
};
