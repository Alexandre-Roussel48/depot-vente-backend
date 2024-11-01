const { getSessionByDate } = require('../models/sessionModel');
const { getStockedRealGamesBySession } = require('../models/realGameModel');

/*=========*/
/* SESSION */
/*=========*/

/* Returns the current session */
exports.getCurrentSession = async (req, res) => {
  try {
    const session = await getSessionByDate(new Date().toISOString());
    res.status(200).json({ session: session });
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
    res.status(200).json({ realgames: realgames });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
