const {
  getUserByEmail,
  comparePasswords,
  createJwt,
} = require('../models/userModel');
const {
  getPaidAmountByClient,
  getDue,
  getSaleTransactionByClient,
  getTransactions,
  createPayTransaction,
  getSoldRealGamesByClient,
} = require('../models/transactionModel');
const {
  getSessions,
  getSessionByDate,
  getDepositFees,
} = require('../models/sessionModel');
const {
  createClient,
  updateClient,
  getClientById,
  getClientByEmail,
} = require('../models/clientModel');
const { getGames } = require('../models/gameModel');
const { getStockedRealGamesByClient } = require('../models/realGameModel');

/*=======*/
/* LOGIN */
/*=======*/

/* Delivers a JWTToken as cookie
 * Params :
 * - email : string
 * - password : string
 */
exports.login = async (req, res) => {
  try {
    const data = req.body;
    const user = await getUserByEmail(data.email);

    if (!user) {
      // Si l'utilisateur n'est pas trouvé, renvoyer une réponse d'erreur générique
      return res
        .status(401)
        .json({ message: "Nom d'utilisateur ou mot de passe incorrect" });
    }

    const isPasswordValid = await comparePasswords(user, data);

    if (!isPasswordValid) {
      // Si le mot de passe n'est pas valide, renvoyer une réponse d'erreur générique
      return res
        .status(401)
        .json({ message: "Nom d'utilisateur ou mot de passe incorrect" });
    }
    const JWTtoken = await createJwt(user);
    res.cookie('authToken', JWTtoken, {
      httpOnly: true,
      maxAge: 28800,
      secure: false,
      sameSite: 'lax',
    });
    res.status(200).json({
      expirationInSec: 28800,
      role: user.role,
      message: 'Connexion réussie',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*=========*/
/* SESSION */
/*=========*/

/* Returns all sessions */
exports.getSessions = async (req, res) => {
  try {
    const sessions = await getSessions();
    res.status(200).json({ sessions: sessions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*========*/
/* CLIENT */
/*========*/

/* Creates a new client
 * Pre-requisites : new client email and/or phone number doesn't already exists
 * Params :
 * - name : string
 * - surname : string
 * - email : string (unique)
 * - phone_number : string (unique)
 * - address : string?
 */
exports.createClient = async (req, res) => {
  try {
    const data = req.body;
    await createClient(data);

    res.status(200).json({ message: 'Client créé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Updates an existing client
 * Params :
 * - name : string?
 * - surname : string?
 * - email : string? (unique)
 * - phone_number : string? (unique)
 * - address : string?
 */
exports.updateClient = async (req, res) => {
  try {
    const data = req.body;
    await updateClient(data);

    res.status(200).json({ message: 'Client mis à jour' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Returns client infos matching id
 * Params :
 * - email : string (unique)
 * - session : Session Object
 */
exports.getClientInfos = async (req, res) => {
  try {
    const data = req.body;

    const session = data.session;

    const client = getClientByEmail(data.email);

    const clientPaidAmount = getPaidAmountByClient(session.id, client.id);

    const clientSoldRG = getSoldRealGamesByClient(session.id, client.id);

    const clientDue = clientSoldRG - clientPaidAmount;

    const clientStockedRG = getStockedRealGamesByClient(session.id, client.id);

    res.status(200).json({
      due: clientDue,
      paidAmount: clientPaidAmount,
      soldRG: clientSoldRG,
      stockedRG: clientStockedRG,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*=====*/
/* DUE */
/*=====*/

/* Returns amount due to a seller in a session
 * Params :
 * - id : string
 */
exports.dueToSeller = async (req, res) => {
  try {
    const clientId = req.params.id;

    const client = await getClientById(clientId);

    const session = await getSessionByDate(new Date().toISOString(), true);

    const sale = await getSoldRealGamesByClient(client.id, session.id);

    //On cherche aussi ce qu'il a déjà retirer
    const alreadyWithdraw = await getPaidAmountByClient(client, session.id);

    const due = await getDue(sale, alreadyWithdraw);

    res.status(200).json({ due });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*  Returns withdrawn money by seller for current session
 * Params :
 * - id : String
 */

exports.withdraw = async (req, res) => {
  try {
    const clientId = req.params.id;

    const client = await getClientById(clientId);

    const session = await getSessionByDate(new Date().toISOString(), true);

    const sale = await getSaleTransactionByClient(client.id, session.id);

    //On cherche aussi ce qu'il a déjà retirer
    const alreadyWithdraw = await getPaidAmountByClient(client, session.id);

    const due = await getDue(sale, alreadyWithdraw);

    //Dans cette fonction, on ne créé pas de transaction si due=0
    const withdraw = await createPayTransaction(client.id, due, session.id);

    res.status(200).json({ withdraw });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*======*/
/* GAME */
/*======*/

/* Returns existing games
 * Params :
 * - query : string (name or editor)
 */
exports.getGames = async (req, res) => {
  try {
    const { query } = req.query;
    const games = await getGames(query);
    res.status(200).json({ games: games });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*==========*/
/* REALGAME */
/*==========*/

/* Returns real games that is own by a specific client
 * Params :
 * - query : string (email or phone_number)
 */

exports.getRealGamesByClient = async (req, res) => {
  try {
    /*const { query } = req.query;
    const client = await getClients(query);
    const realGameByClient = await getRealGamesByClient(client);
    res.status(200).json({ realGames: realGameByClient });*/
    res.status(200).json('TODO');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*======*/
/* FEES */
/*======*/

/* Returns deposit_fees for the current session
 */

exports.depositFees = async (req, res) => {
  try {
    const session = await getSessionByDate(new Date().toISOString(), true);

    const deposit_fees = await getDepositFees(session.id);

    res.status(200).json({ deposit_fees });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*=============*/
/* TRANSACTION */
/*=============*/

/* Returns total transactions in the current session
 */

exports.transactions = async (req, res) => {
  try {
    const session = await getSessionByDate(new Date().toISOString(), true);

    const totalTransactions = await getTransactions(session.id);

    res.status(200).json({ totalTransactions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
