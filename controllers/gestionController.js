const {
  getUserByEmail,
  comparePasswords,
  createJwt,
} = require('../models/userModel');
const { createRealGame, getRealGame } = require('../models/realGameModel');
const { createTransaction } = require('../models/transactionModel');

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
      return res.status(401).json({ message: 'mot de passe incorrect.' });
    }
    const JWTtoken = await createJwt(user);
    // Set HttpOnly cookie with the JWT
    /*res.cookie('jwtToken', JWTtoken, {
            httpOnly: true, // Cookie is accessible only by the server
            maxAge: 3600000, // Expiry in milliseconds (1 hour)
            secure: false // Set to true if using HTTPS
        });*/
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
