const { PrismaClient, Status } = require('@prisma/client');

const prisma = new PrismaClient();

async function getRealGamesBySession(session_id) {
  try {
    const realgames = await prisma.realgame.findMany({
      where: {
        session_id: session_id,
      },
    });
    return realgames;
  } catch (error) {
    throw new Error(
      `Erreur serveur lors de la récupération du catalogue: ${error.message}`
    );
  }
}

async function getRealGame(data) {
  try {
    const realgame = await prisma.realgame.findMany({
      where: {
        unit_price: data.unit_price,
        status: data.status,
        session_id: data.session_id,
        seller_id: data.seller_id,
        game_id: data.game_id,
      },
    });
    return realgame;
  } catch (error) {
    throw new Error(
      `Erreur serveur lors de la récupération des realGame: ${error.message}`
    );
  }
}

async function createRealGame(data) {
  try {
    const realGames = [];
    //const currentSession = await getSession();
    // /!\ la session courante doit etre passee depuis le controller ^

    for (const game of data.games) {
      // Créer plusieurs RealGames selon la quantité
      for (let i = 0; i < game.quantity; i++) {
        const realGame = await prisma.realgame.create({
          data: {
            unit_price: game.unit_price,
            status: Status.STOCK, // Status initial en STOCK
            session: 1,
            seller: data.id_client,
            game: game.game_id,
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

module.exports = {
  getRealGamesBySession,
  getRealGame,
  createRealGame,
};
