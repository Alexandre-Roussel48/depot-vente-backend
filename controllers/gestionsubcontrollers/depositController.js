const { getSessionByDate } = require('../../models/sessionModel');
const { createDepositTransaction } = require('../../models/transactionModel');
const { createRealGames } = require('../../models/realGameModel');
const { getClientByEmail, createClient } = require('../../models/clientModel');

/*=========*/
/* DEPOSIT */
/*=========*/

exports.getClientByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const client = await getClientByEmail(email);

    res.status(200).json({ client_id: client.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.registerClient = async (req, res) => {
  try {
    const data = req.body;
    const client = await createClient(data);

    res.status(200).json({ client_id: client.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Creates a new deposit
 * Params :
 * - client_id : string
 * - discount : number
 * - deposit : [] with :
 *    - game_id : number
 *    - qty : number
 *    - unit_price : number
 */
exports.registerDeposit = async (req, res) => {
  try {
    const data = req.body;

    const session = await getSessionByDate(new Date().toISOString(), true);

    const transactionData = await createDepositTransaction(
      session.id,
      session.fees,
      data.client_id,
      data.discount
    );
    const realGameData = await createRealGames(
      session.id,
      data.client_id,
      data.deposit
    );
    res.status(200).json({ transactionData, realGameData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
