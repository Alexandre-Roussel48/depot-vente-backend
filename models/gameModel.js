const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/*======*/
/* GAME */
/*======*/

/*********
 * CREATE *
 *********/

/* Creates a new game
 * Params :
 * - data : dict with :
 *   - name : string
 *   - editor : string
 */
async function createGame(data) {
  try {
    await prisma.game.create({
      data: {
        name: data.name.toLowerCase(),
        editor: data.editor.toLowerCase(),
      },
    });
  } catch (error) {
    throw new Error(
      `Erreur serveur lors de la création d'un jeu: ${error.message}`
    );
  }
}

/*********
 * UPDATE *
 *********/

/* Updates an existing game
 * Params :
 * - data : dict with :
 *   - name : string?
 *   - editor : string?
 */
async function updateGame(data) {
  try {
    await prisma.game.update({
      where: { id: data.id },
      data: {
        ...(data.name && { name: data.name.toLowerCase() }), // Include only if name exists
        ...(data.editor && { editor: data.editor.toLowerCase() }), // Include only if editor exists
      },
    });
  } catch (error) {
    throw new Error(
      `Erreur serveur lors de la mise à jour d'un jeu: ${error.message}`
    );
  }
}

/*********
 * DELETE *
 *********/

/* Deletes an existing game
 * Params :
 * - data : dict with :
 *   - id : number
 */
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

/**********
 * GETTERS *
 **********/

/* Returns existing games
 * Params :
 * - data : string (name or editor)
 */
async function getGames(data) {
  try {
    const games = await prisma.game.findMany({
      where: {
        OR: [
          { name: { startsWith: data.toLowerCase() } },
          { editor: { startsWith: data.toLowerCase() } },
        ],
      },
    });
    return games;
  } catch (error) {
    throw new Error(
      `Erreur serveur lors de la récupération des jeux: ${error.message}`
    );
  }
}

module.exports = {
  createGame,
  updateGame,
  deleteGame,
  getGames,
};
