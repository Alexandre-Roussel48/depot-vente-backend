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

module.exports = {
  createDepositTransaction,
};
