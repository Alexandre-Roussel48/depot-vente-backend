const {
  getUserByEmail,
  comparePasswords,
  createJwt,
} = require('../models/userModel');
const { createRealGames } = require('../models/realGameModel');
const { createDepositTransaction } = require('../models/transactionModel');
const { getSessions, getSessionByDate } = require('../models/sessionModel');
const {
  getClients,
  createClient,
  updateClient,
} = require('../models/clientModel');
const { getGames } = require('../models/gameModel');

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
      maxAge: 3600000,
      secure: false,
    });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*=========*/
/* DEPOSIT */
/*=========*/

/* Creates a new deposit
 * Params :
 * - client_id : string
 * - discount : number
 * - deposit : [] with :
 *    - game_id : number
 *    - qty : number
 *    - unit_price : number
 */
exports.createDeposit = async (req, res) => {
  try {
    const data = req.body;

    const session = await getSessionByDate(new Date().toISOString(), true);

    const transactionData = await createDepositTransaction(
      session.id,
      session.fees,
      data
    );
    const realGameData = await createRealGames(session.id, data);
    res.status(200).json({ transactionData, realGameData });
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

/* Returns existing clients
 * Params :
 * - query : string (email or phone_number)
 */
exports.getClients = async (req, res) => {
  try {
    const { query } = req.query;
    const clients = await getClients(query);
    res.status(200).json({ clients: clients });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
