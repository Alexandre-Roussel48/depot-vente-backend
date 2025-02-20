const { PrismaClient, Type, Status } = require('@prisma/client');

const prisma = new PrismaClient();

/*=============*/
/* TRANSACTION */
/*=============*/

/*********
 * CREATE *
 *********/

/* Creates a new sale transaction
 * Pre-requisites : items of realgames are not already sold
 * Params :
 * - session : Session
 * - realgames : array of realgame_id
 */
async function createSaleTransactions(session, realgames) {
  try {
    const saleTransactions = [];
    for (let realgame_id of realgames) {
      const realGame = await prisma.realgame.findFirst({
        where: {
          id: realgame_id,
          session_id: session.id,
          status: Status.STOCK,
        },
      });
      if (!realGame) {
        throw new Error(
          "Jeu introuvable, n'appartenant pas a la session actuelle ou pas en stock"
        );
      }
      const saleTransaction = await prisma.transaction.create({
        data: {
          value: realGame.unit_price - realGame.unit_price * session.commission,
          type: Type.SALE,
          session_id: session.id,
          seller_id: realGame.seller_id,
          realgame_id: realGame.id,
        },
      });
      saleTransactions.push(saleTransaction);
    }
    return saleTransactions;
  } catch (error) {
    throw new Error(`Error creating sale transaction: ${error.message}`);
  }
}

/* Creates a new commission transaction
 * Pre-requisites : items of realgames are not already sold
 * Params :
 * - session : Session
 * - realgames : array of realgame_id
 */
async function createCommissionTransactions(session, realgames) {
  try {
    const commissionTransactions = [];
    for (let realgame_id of realgames) {
      const realGame = await prisma.realgame.findFirst({
        where: {
          id: realgame_id,
          session_id: session.id,
          status: Status.STOCK,
        },
      });
      if (!realGame) {
        throw new Error(
          "Jeu introuvable, n'appartenant pas a la session actuelle ou pas en stock"
        );
      }
      const commissionTransaction = await prisma.transaction.create({
        data: {
          value: realGame.unit_price * session.commission,
          type: Type.COMMISSION,
          session_id: session.id,
          seller_id: realGame.seller_id,
          realgame_id: realGame.id,
        },
      });
      commissionTransactions.push(commissionTransaction);
    }
    return commissionTransactions;
  } catch (error) {
    throw new Error(`Error creating sale transaction: ${error.message}`);
  }
}

async function createDepositTransaction(
  session_id,
  session_fees,
  client_id,
  discount
) {
  try {
    const transaction = await prisma.transaction.create({
      data: {
        value: session_fees - session_fees * discount,
        type: Type.DEPOSIT,
        session_id: session_id,
        seller_id: client_id,
      },
    });
    return transaction;
  } catch (error) {
    throw new Error(`Error creating transaction: ${error.message}`);
  }
}

async function createPayTransaction(seller_id, due, session_id) {
  try {
    const paiement = await prisma.transaction.create({
      data: {
        value: due,
        type: Type.PAY,
        session_id: session_id,
        seller_id: seller_id,
      },
    });
    return paiement;
  } catch (error) {
    throw new Error(`Error creating transaction: ${error.message}`);
  }
}

/**********
 * GETTERS *
 **********/

async function getSoldRealGamesByClient(session_id, client_id) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        session_id: session_id,
        seller_id: client_id,
        type: Type.SALE,
      },
    });
    let totalSales = 0;
    for (const transaction of transactions) {
      totalSales += Number(transaction.value);
    }
    return totalSales;
  } catch (error) {
    throw new Error(`Error finding Paye transaction: ${error.message}`);
  }
}

async function getTotalPay(session_id) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        session_id: session_id,
        type: Type.PAY,
      },
    });
    let totalPaye = 0;
    for (const transaction of transactions) {
      totalPaye += Number(transaction.value);
    }
    return totalPaye;
  } catch (error) {
    throw new Error(
      `Error finding Paye transaction for all clients in the current session: ${error.message}`
    );
  }
}

async function getPaidAmountByClient(session_id, client_id) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        session_id: session_id,
        seller_id: client_id,
        type: Type.PAY,
      },
    });
    let totalPaye = 0;
    for (const transaction of transactions) {
      totalPaye += Number(transaction.value);
    }
    return totalPaye;
  } catch (error) {
    throw new Error(`Error finding Paye transaction: ${error.message}`);
  }
}

async function getTotalSales(session_id) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        session_id: session_id,
        type: Type.SALE,
      },
    });
    let totalSales = 0;
    for (const transaction of transactions) {
      totalSales += Number(transaction.value);
    }
    return totalSales;
  } catch (error) {
    throw new Error(
      `Error finding Paye transaction for all clients: ${error.message}`
    );
  }
}

async function getTotalDepositFees(session_id) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        session_id: session_id,
        type: Type.DEPOSIT,
      },
    });
    let totalFees = 0;
    for (const transaction of transactions) {
      totalFees += Number(transaction.value);
    }
    return totalFees;
  } catch (error) {
    throw new Error(`Error finding Fees: ${error.message}`);
  }
}

async function getTotalCommissions(session_id) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        session_id: session_id,
        type: Type.COMMISSION,
      },
    });
    let totalCommission = 0;
    for (const transaction of transactions) {
      totalCommission += Number(transaction.value);
    }
    return totalCommission;
  } catch (error) {
    throw new Error(`Error finding Commissions: ${error.message}`);
  }
}

async function getTransactions(session_id) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        session_id: session_id,
      },
      include: {
        seller: true, // Inclure les informations du vendeur
      },
    });
    return transactions;
  } catch (error) {
    throw new Error(`Error finding Transactions: ${error.message}`);
  }
}

module.exports = {
  createDepositTransaction,
  createSaleTransactions,
  createPayTransaction,
  createCommissionTransactions,
  getPaidAmountByClient,
  getTotalPay,
  getSoldRealGamesByClient,
  getTotalSales,
  getTotalDepositFees,
  getTotalCommissions,
  getTransactions,
};
