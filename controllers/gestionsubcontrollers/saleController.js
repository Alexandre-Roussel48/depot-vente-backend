const { getSessionByDate } = require('../../models/sessionModel');
const {
  getStockedRealGamesBySession,
  sellRealGames,
} = require('../../models/realGameModel');
const {
  createSaleTransactions,
  createCommissionTransactions,
} = require('../../models/transactionModel');

/*======*/
/* SALE */
/*======*/

/* Returns the realgames where etiquette startWith query */
exports.getRealGamesForSale = async (req, res) => {
  try {
    const session = await getSessionByDate(new Date().toISOString());
    const session_id = session.id;

    const query = req.query;
    const realgames = await getStockedRealGamesBySession(session_id, query);

    const transformedArray = realgames.map((item) => ({
      id: item.id,
      unit_price: item.unit_price,
      gameName: item.game.name,
      gameEditor: item.game.editor,
    }));

    res.status(200).json(transformedArray);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Creates a new sale
 * Params :
 * - [] of realgame_id : String
 */
exports.registerSale = async (req, res) => {
  try {
    const realgames = req.body;

    const session = await getSessionByDate(new Date().toISOString(), true);

    const saleTransactions = await createSaleTransactions(session, realgames);
    const commissionTransactions = await createCommissionTransactions(
      session,
      realgames
    );
    const sales = await sellRealGames(session.id, realgames);

    res.status(200).json({ saleTransactions, commissionTransactions, sales });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
