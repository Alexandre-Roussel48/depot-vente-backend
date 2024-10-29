const express = require('express');
/*const sessionController = require('../controllers/sessionController');
const catalogController = require('../controllers/catalogController');
const adminRoutes = require('./adminRoutes');*/
const gestionRoutes = require('./gestionRoutes');
//const verifyToken = require('../middleware/authMiddleware');
//const rateLimit = require('express-rate-limit');

function routes() {
  const router = express.Router();

  //router.get('/session', sessionController.current);

  //router.get('/catalog', catalogController.catalog);

  //router.use('/admin', adminRoutes());
  router.use('/gestion', gestionRoutes());

  return router;
}

module.exports = { routes };
