const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/*=========*/
/* SESSION */
/*=========*/

/* Returns all sessions */
async function getSessions() {
  try {
    const sessions = await prisma.session.findMany({});
    return sessions;
  } catch (error) {
    throw new Error(
      `Erreur serveur lors de la récupération des sessions: ${error.message}`
    );
  }
}

/* Returns the session (if exists) where date falls
 * Params :
 * - date : string ISO FORMAT
 * - verbose : boolean
 */
async function getSessionByDate(date, verbose) {
  try {
    const session = await prisma.session.findFirst({
      where: {
        begin_date: { lte: date },
        end_date: { gte: date },
      },
      ...(!verbose && {
        select: {
          begin_date: true,
          end_date: true,
        },
      }),
    });

    return session;
  } catch (error) {
    throw new Error(
      `Erreur serveur lors de la récupération de la session courante: ${error.message}`
    );
  }
}

/* Creates a new session
 * Pre-requisites : new session doesn't overlap existing ones
 * Params :
 * - data : dict with :
 *   - begin_date : string ISO FORMAT
 *   - end_date : string ISO FORMAT
 *   - commission : number
 *   - fees : number
 */
async function createSession(data) {
  try {
    if (
      data.begin_date <
      new Date().toISOString().split('T')[0] + 'T00:00.000Z'
    ) {
      throw new Error(
        'La date de début de la session ne peut pas être inférieure à la date courante'
      );
    } else if (data.end_date < data.begin_date) {
      throw new Error(
        'La date de fin ne peut pas être inférieure à la date de début de la session'
      );
    }

    const overlappingSession = await prisma.session.findFirst({
      where: {
        end_date: { gte: data.begin_date },
      },
    });

    if (overlappingSession) {
      throw new Error('Impossible de créer, une session est déjà en cours');
    }

    await prisma.session.create({
      data: {
        begin_date: data.begin_date,
        end_date: data.end_date,
        commission: data.commission,
        fees: data.fees,
      },
    });
  } catch (error) {
    throw new Error(
      `Erreur serveur lors de la création d'une session: ${error.message}`
    );
  }
}

/* Updates an existing session
 * Pre-requisites : only updates commission & fees
 * Params :
 * - data : dict with :
 *   - commission : number?
 *   - fees : number?
 */
async function updateSession(data) {
  try {
    await prisma.session.update({
      where: { id: data.id },
      data: {
        ...(data.commission && { commission: data.commission }), // Include only if commission exists
        ...(data.fees && { fees: data.fees }), // Include only if fees exists
      },
    });
  } catch (error) {
    throw new Error(
      `Erreur serveur lors de la mise à jour d'une session: ${error.message}`
    );
  }
}

/* Deletes an existing session
 * Params :
 * - data : dict with :
 *   - id : number
 * Remark : Doesn't delete associated data (realgames, transactions, etc...)
 */
async function deleteSession(data) {
  try {
    await prisma.session.delete({
      where: { id: data.id },
    });
  } catch (error) {
    throw new Error(
      `Erreur serveur lors de la suppression d'une session: ${error.message}`
    );
  }
}

async function getDepositFees(session_id) {
  try {
    const deposit_fees = await prisma.session.findUnique({
      where: { id: session_id },
    });
    return deposit_fees;
  } catch (error) {
    throw new Error(
      `Erreur serveur lors de la récupération des fraits de dépots: ${error.message}`
    );
  }
}

module.exports = {
  getSessions,
  getSessionByDate,
  createSession,
  updateSession,
  deleteSession,
  getDepositFees,
};
