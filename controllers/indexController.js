const { getSessionByDate } = require('../models/sessionModel');
const { getRealGamesBySession } = require('../models/realGameModel');

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
    const catalog = await getRealGamesBySession(session_id);
    res.status(200).json({ catalog: catalog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
