const { PrismaClient, Type } = require('@prisma/client');

const prisma = new PrismaClient();

/*=============*/
/* TRANSACTION */
/*=============*/

async function createDepositTransaction(session_id, session_fees, data) {
  try {
    const transaction = await prisma.transaction.create({
      data: {
        value: session_fees - session_fees * data.discount,
        type: Type.DEPOSIT,
        session_id: session_id,
        seller_id: data.client_id,
      },
    });
    return transaction;
  } catch (error) {
    throw new Error(`Error creating transaction: ${error.message}`);
  }
}

async function createSaleTransaction(data, session) {
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

async function getPayTransactionByClient(client, session_id) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        session_id: session_id,
        seller_id: client.id,
        type: Type.PAY,
      },
    });
    return transactions;
  } catch (error) {
    throw new Error(`Error finding Sale transaction: ${error.message}`);
  }
}

async function getDue(transactions) {
  try {
    let due = 0;
    for (const transaction of transactions) {
      due += transaction.value;
    }
    return due;
  } catch (error) {
    throw new Error(`Error finding due: ${error.message}`);
  }
}

module.exports = {
  createDepositTransaction,
  createSaleTransaction,
  getPayTransactionByClient,
  getDue,
};
