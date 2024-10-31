const {
  getUserByEmail,
  comparePasswords,
  createJwt,
} = require('../models/userModel');
const { createRealGame, getRealGame } = require('../models/realGameModel');
const { createTransaction } = require('../models/transactionModel');
const { getSessions } = require('../models/sessionModel');
const {
  getClients,
  createClient,
  updateClient,
} = require('../models/clientModel');
const { getGames } = require('../models/gameModel');

exports.login = async (req, res) => {
  try {
    const data = req.body;
    const user = await getUserByEmail(data.email);

    if (!user) {
      // Si l'utilisateur n'est pas trouvé, renvoyer une réponse d'erreur
      return res.status(401).json({ message: "Nom d'utilisateur introuvable" });
    }

    const isPasswordValid = await comparePasswords(user, data);

    if (!isPasswordValid) {
      // Si le mot de passe n'est pas valide, renvoyer une réponse d'erreur
      return res.status(401).json({ message: 'mot de passe incorrect' });
    }
    const JWTtoken = await createJwt(user);
    // Set HttpOnly cookie with the JWT
    /*res.cookie('jwtToken', JWTtoken, {
            httpOnly: true, // Cookie is accessible only by the server
            maxAge: 3600000, // Expiry in milliseconds (1 hour)
            secure: false // Set to true if using HTTPS
        });*/

    // /!\ ne pas renvoyer le token en json (cf en dessous) mais set le cookie comme au dessus. /!\
    res.status(200).json({ token: JWTtoken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.realGames = async (req, res) => {
  try {
    const query = req.body;
    const realGames = await getRealGame(query);
    res.json(realGames);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deposit = async (req, res) => {
  try {
    const data = req.body;
    const transactionData = await createTransaction(data);
    const realGameData = await createRealGame(data);
    res.json(transactionData, realGameData);
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
