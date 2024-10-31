const express = require('express');
const indexController = require('../controllers/indexController');
const adminRoutes = require('./adminRoutes');
const gestionRoutes = require('./gestionRoutes');
//const verifyToken = require('../middleware/authMiddleware');
//const verifyAdmin = require('../middleware/adminMiddleware');
//const rateLimit = require('express-rate-limit');

function routes() {
  const router = express.Router();

  router.get(
    '/session',
    indexController.getCurrentSession
  ); /* GET /api/session -> Returns current session    */
  router.get(
    '/catalog',
    indexController.getCurrentCatalog
  ); /* GET /api/catalog -> Returns current realgames  */

  //router.use('/admin', verifyAdmin, adminRoutes()); /!\ to use on prod

  router.use(
    '/admin',
    adminRoutes()
  ); /* /api/admin/...   -> Admin features             */
  router.use(
    '/gestion',
    gestionRoutes()
  ); /* /api/gestion/... -> Gestion features           */

  return router;
}

module.exports = { routes };
