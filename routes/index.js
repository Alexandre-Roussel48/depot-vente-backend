const express = require('express');
const indexController = require('../controllers/indexController');
const adminRoutes = require('./adminRoutes');
const gestionRoutes = require('./gestionRoutes');
//const verifyToken = require('../middleware/authMiddleware');
//const verifyAdmin = require('../middleware/adminMiddleware');
//const rateLimit = require('express-rate-limit');

function routes() {
  const router = express.Router();

  router.get('/session', indexController.getCurrentSession);
  router.get('/catalog', indexController.getCurrentCatalog);

  //router.use('/admin', verifyAdmin, adminRoutes()); /!\ to use on prod
  router.use('/admin', adminRoutes());
  router.use('/gestion', gestionRoutes());

  return router;
}

module.exports = { routes };
