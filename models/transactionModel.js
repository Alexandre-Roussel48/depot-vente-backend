const { PrismaClient, Types } = require('@prisma/client');

const prisma = new PrismaClient();

/*=============*/
/* TRANSACTION */
/*=============*/

async function createTransaction(data) {
  try {
    const totalValue = await getValue(data.games);
    //const currentSession = await getSession();
    const transaction = await prisma.transaction.create({
      data: {
        value: totalValue,
        Types: Types.DEPOSIT,
        session_id: 1,
        seller_id: data.client_id,
      },
    });
    return transaction;
  } catch (error) {
    throw new Error(`Error creating transaction: ${error.message}`);
  }
}

async function getValue(games) {
  return games.reduce((total, game) => {
    return total + game.quantity * game.unit_price;
  }, 0);
}

module.exports = {
  createTransaction,
};
