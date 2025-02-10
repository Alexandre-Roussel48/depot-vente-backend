const {
  createSession,
  updateSession,
  deleteSession,
} = require('../models/sessionModel');
const { deleteClient } = require('../models/clientModel');
const { createGame, updateGame, deleteGame } = require('../models/gameModel');

/*=========*/
/* SESSION */
/*=========*/

/* Creates a new session
 * Pre-requisites : new session doesn't overlap existing ones
 * Params :
 * - begin_date : string ISO FORMAT
 * - end_date : string ISO FORMAT
 * - commission : number
 * - fees : number
 */
exports.createSession = async (req, res) => {
  try {
    const data = req.body;
    await createSession(data);

    res.status(200).json({ message: 'Session créée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Updates an existing session
 * Pre-requisites : only updates commission & fees
 * Params :
 * - commission : number?
 * - fees : number?
 */
exports.updateSession = async (req, res) => {
  try {
    const data = req.body;
    await updateSession(data);

    res.status(200).json({ message: 'Session mise à jour' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Deletes an existing session
 * Params :
 * - id : number
 * Remark : Doesn't delete associated data (realgames, transactions, etc...)
 */
exports.deleteSession = async (req, res) => {
  try {
    const data = req.body;
    await deleteSession(data);

    res.status(200).json({ message: 'Session supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*========*/
/* CLIENT */
/*========*/

/* Deletes an existing client
 * Params :
 * - id : string
 * Remark : Doesn't delete associated data (realgames, transactions, etc...)
 */
exports.deleteClient = async (req, res) => {
  try {
    const data = req.body;
    await deleteClient(data);

    res.status(200).json({ message: 'Client supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*======*/
/* GAME */
/*======*/

/* Creates a new game
 * Params :
 * - name : string
 * - editor : string
 */
exports.createGame = async (req, res) => {
  try {
    const data = req.body;
    await createGame(data);

    res.status(200).json({ message: 'Jeu créé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Updates an existing game
 * Params :
 * - name : string?
 * - editor : string?
 */
exports.updateGame = async (req, res) => {
  try {
    const data = req.body;
    await updateGame(data);

    res.status(200).json({ message: 'Jeu mis à jour' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Deletes an existing game
 * Params :
 * - id : number
 */
exports.deleteGame = async (req, res) => {
  try {
    const data = req.body;
    await deleteGame(data);

    res.status(200).json({ message: 'Jeu supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
