const { PrismaClient, Status } = require('@prisma/client');

const prisma = new PrismaClient();

/*==========*/
/* REALGAME */
/*==========*/

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
        ],
        ...(range && {
          unit_price: { gte: +range.split('-')[0], lte: +range.split('-')[1] },
        }),
      },
      include: {
        game: true,
      },
    });

    const groupedData = realgames.reduce((acc, item) => {
      const { unit_price, seller_id, game_id, game } = item;
      const { name, editor } = game;
      const key = `${unit_price}-${seller_id}-${game_id}`;

      if (!acc[key]) {
        acc[key] = {
          unit_price,
          seller_id,
          name,
          editor,
          qty: 0,
        };
      }

      acc[key].qty += 1;
      return acc;
    }, {});

    const result = Object.values(groupedData);
    return result;
  } catch (error) {
    throw new Error(
      `Erreur serveur lors de la récupération du catalogue: ${error.message}`
    );
  }
}

async function createRealGames(session_id, data) {
  try {
    const realGames = [];

    for (const game of data.deposit) {
      for (let i = 0; i < game.qty; i++) {
        const realGame = await prisma.realgame.create({
          data: {
            unit_price: game.unit_price,
            status: Status.STOCK, // Status initial en STOCK
            session_id: session_id,
            seller_id: data.client_id,
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

module.exports = {
  getStockedRealGamesBySession,
  createRealGames,
};
