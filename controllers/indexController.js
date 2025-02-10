const { getSessionByDate } = require('../models/sessionModel');
const { getStockedRealGamesBySession } = require('../models/realGameModel');

/*=========*/
/* SESSION */
/*=========*/

/* Returns the current session */
exports.getCurrentSession = async (req, res) => {
  try {
    const session = await getSessionByDate(new Date().toISOString(), false);
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*==========*/
/* REALGAME */
/*==========*/

/* Returns the current catalog */
exports.getCurrentCatalog = async (req, res) => {
  try {
    const session = await getSessionByDate(new Date().toISOString());
    const session_id = session.id;

    const query = req.query;
    const realgames = await getStockedRealGamesBySession(session_id, query);

    // data format for output
    const groupedData = realgames.reduce((acc, item) => {
      const { unit_price, seller_id, game_id, game, seller } = item;
      const { name: gameName, editor: gameEditor } = game;
      const { name: sellerName, surname: sellerSurname } = seller;
      const key = `${unit_price}-${seller_id}-${game_id}`;

      if (!acc[key]) {
        acc[key] = {
          unit_price,
          gameName,
          gameEditor,
          sellerName,
          sellerSurname,
          qty: 0,
        };
      }

      acc[key].qty += 1;
      return acc;
    }, {});

    const result = Object.values(groupedData);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
