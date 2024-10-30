const {
  createSession,
  updateSession,
  deleteSession,
} = require('../models/sessionModel');
const { deleteClient } = require('../models/clientModel');
const { createGame, updateGame, deleteGame } = require('../models/gameModel');

exports.createSession = async (req, res) => {
  try {
    const data = req.body;
    await createSession(data);

    res.status(200).json({ message: 'Session créée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSession = async (req, res) => {
  try {
    const data = req.body;
    await updateSession(data);

    res.status(200).json({ message: 'Session mise à jour' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSession = async (req, res) => {
  try {
    const data = req.body;
    await deleteSession(data);

    res.status(200).json({ message: 'Session supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const data = req.body;
    await deleteClient(data);

    res.status(200).json({ message: 'Client supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createGame = async (req, res) => {
  try {
    const data = req.body;
    await createGame(data);

    res.status(200).json({ message: 'Jeu créé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateGame = async (req, res) => {
  try {
    const data = req.body;
    await updateGame(data);

    res.status(200).json({ message: 'Jeu mis à jour' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteGame = async (req, res) => {
  try {
    const data = req.body;
    await deleteGame(data);

    res.status(200).json({ message: 'Jeu supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
