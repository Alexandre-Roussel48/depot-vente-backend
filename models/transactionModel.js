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

async function createPayTransaction(data, session) {
  try {
    const totalValue = (await data.unit_price) * data.sale.lenght;
    const sale = await prisma.transaction.create({
      data: {
        value: totalValue,
        type: Type.PAY,
        session_id: session.id,
        seller_id: data.seller_id,
        buyer_id: data.buyer_id,
      },
    });
    const commission = totalValue * session.commission;
    await prisma.transaction.create({
      data: {
        value: commission,
        type: Type.COMMISSION,
        session_id: session.id,
        seller_id: data.seller_id,
      },
    });
    return sale;
  } catch (error) {
    throw new Error(`Error creating transaction: ${error.message}`);
  }
}

/**********
 * GETTERS *
 **********/

async function getPayTransactionByClient(client_id, session_id) {
  /* SUGGESTION : update to getSaleAmountByClient -> returns total_sales (number) */
  /* SUGGESTION : create getPaidAmountByClient -> returns total_pay (number) */
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        session_id: session_id,
        seller_id: client_id,
        type: Type.PAY,
      },
    });
    return transactions;
  } catch (error) {
    throw new Error(`Error finding Paye transaction: ${error.message}`);
  }
}

async function getPayTransaction(session_id) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        session_id: session_id,
        type: Type.PAY,
      },
    });
    return transactions;
  } catch (error) {
    throw new Error(
      `Error finding Paye transaction for all clients in the current session: ${error.message}`
    );
  }
}

async function getSaleTransactionByClient(client_id, session_id) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        session_id: session_id,
        seller_id: client_id,
        type: Type.SALE,
      },
    });
    return transactions;
  } catch (error) {
    throw new Error(`Error finding Paye transaction: ${error.message}`);
  }
}

async function getSaleTransaction(session_id) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        session_id: session_id,
        type: Type.SALE,
      },
    });
    return transactions;
  } catch (error) {
    throw new Error(
      `Error finding Paye transaction for all clients: ${error.message}`
    );
  }
}

async function getFees(session_id) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        session_id: session_id,
        type: Type.DEPOSIT,
      },
    });
    let totalFees = 0;
    for (const transaction of transactions) {
      totalFees += transaction.value;
    }
    return totalFees;
  } catch (error) {
    throw new Error(`Error finding Fees: ${error.message}`);
  }
}

async function getCommissions(session_id) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        session_id: session_id,
        type: Type.COMMISSION,
      },
    });
    let totalCommission = 0;
    for (const transaction of transactions) {
      totalCommission += transaction.value;
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
    });
    return transactions;
  } catch (error) {
    throw new Error(`Error finding Transactions: ${error.message}`);
  }
}

async function getDue(sales, alreadyWithdraw) {
  try {
    let due = 0;
    for (const sale of sales) {
      due += sale.value;
    }

    for (const withdraw of alreadyWithdraw) {
      due -= withdraw.value;
    }

    return due;
  } catch (error) {
    throw new Error(`Error finding due: ${error.message}`);
  }
}

module.exports = {
  createDepositTransaction,
  createSaleTransactions,
  createCommissionTransactions,
  createPayTransaction,
  getPayTransactionByClient,
  getPayTransaction,
  getSaleTransactionByClient,
  getSaleTransaction,
  getFees,
  getCommissions,
  getTransactions,
  getDue,
};
