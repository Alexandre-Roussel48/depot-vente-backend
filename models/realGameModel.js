const { PrismaClient, Status } = require('@prisma/client');

const prisma = new PrismaClient();

/*==========*/
/* REALGAME */
/*==========*/

/*********
 * CREATE *
 *********/

/* Creates new realgames
 * Params :
 * - session_id : number
 * - client_id : string
 * - deposit : array of dict with :
 *   - unit_price : number
 *   - qty : number
 *   - game_id : number
 */
async function createRealGames(session_id, client_id, deposit) {
  try {
    const realGames = [];

    for (const game of deposit) {
      for (let i = 0; i < game.qty; i++) {
        const realGame = await prisma.realgame.create({
          data: {
            unit_price: game.unit_price,
            status: Status.STOCK, // Status initial en STOCK
            session_id: session_id,
            seller_id: client_id,
            game_id: game.game_id,
          },
        });
        realGames.push(realGame);
      }
    }
    return realGames;
  } catch (error) {
    throw new Error(`Error creating realgame: ${error.message}`);
  }
}

/*********
 * UPDATE *
 *********/

/* Updates realgames status to SOLD
 * Pre-requisites : items of realgames are not already sold
 * Params :
 * - session_id : number
 * - realgames : array of realgame_id
 */
async function sellRealGames(session_id, realgames) {
  try {
    const realGames = [];
    for (const realgame_id of realgames) {
      const realGame = await prisma.realgame.update({
        where: {
          id: realgame_id,
          session_id: session_id,
          status: Status.STOCK,
        },
        data: {
          status: Status.SOLD,
        },
      });
      if (!realGame) {
        throw new Error(
          "Jeu introuvable ou n'appartenant pas a la session actuelle"
        );
      }
      realGames.push(realGame);
    }
    return realGames;
  } catch (error) {
    throw new Error(
      `Erreur serveur lors de la vente d'un jeu réel: ${error.message}`
    );
  }
}

/**********
 * GETTERS *
 **********/

/* Returns stocked realgames by session that matches query
 * Params :
 * - session_id : number
 * - queryParams : dict with :
 *   - query : string
 *   - range : string (eg:5-10)
 */
async function getStockedRealGamesBySession(session_id, queryParams) {
  try {
    const { query, range } = queryParams;

    const realgames = await prisma.realgame.findMany({
      where: {
        session_id: session_id,
        status: Status.STOCK,
        OR: [
          { game: { name: { startsWith: query } } },
          { game: { editor: { startsWith: query } } },
          { id: { startsWith: query } },
        ],
        ...(range && {
          unit_price: { gte: +range.split('-')[0], lte: +range.split('-')[1] },
        }),
      },
      include: {
        game: true,
        seller: true,
      },
    });

    return realgames;
  } catch (error) {
    throw new Error(
      `Erreur serveur lors de la récupération du catalogue: ${error.message}`
    );
  }
}

async function getSoldRGByClient(session_id, client_id) {
  try {
    const realgames = await prisma.realgame.findMany({
      where: {
        session_id: session_id,
        status: Status.SOLD,
        seller_id: client_id,
      },
    });
    return realgames;
  } catch (error) {
    throw new Error(
      `Erreur serveur lors de la récupération des jeux réels vendu d'un client: ${error.message}`
    );
  }
}

async function getStockedRealGamesByClient(session_id, client_id) {
  try {
    const realgames = await prisma.realgame.findMany({
      where: {
        session_id: session_id,
        status: Status.STOCK,
        seller_id: client_id,
      },
    });
    return realgames;
  } catch (error) {
    throw new Error(
      `Erreur serveur lors de la récupération des jeux réels stockés d'un client: ${error.message}`
    );
  }
}

async function getRealGamesByClient(data) {
  try {
    const realGames = await prisma.realgame.findMany({
      where: {
        seller_id: data.id,
      },
    });
    return realGames;
  } catch (error) {
    throw new Error(
      `Erreur serveur lors de la récupération des jeux réels par client: ${error.message}`
    );
  }
}

module.exports = {
  createRealGames,
  sellRealGames,
  getStockedRealGamesBySession,
  getStockedRealGamesByClient,
  getSoldRGByClient,
  getRealGamesByClient,
};
