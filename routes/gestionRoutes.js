const express = require('express');
const gestionController = require('../controllers/gestionController');

function gestionRoutes() {
  const gestionRouter = express.Router();

  gestionRouter.post(
    '/login',
    gestionController.login
  ); /* POST /api/gestion/login          ->  Returns a JWTToken as cookie */
  gestionRouter.post(
    '/deposit',
    gestionController.createDeposit
  ); /* POST /api/gestion/deposit        ->  Returns transaction and deposit data */

  gestionRouter.get(
    '/session',
    gestionController.getSessions
  ); /* GET  /api/gestion/session        -> Returns all sessions               */
  gestionRouter.get(
    '/client',
    gestionController.getClients
  ); /* GET  /api/gestion/client(?query) -> Returns all clients matching query */
  gestionRouter.post(
    '/client',
    gestionController.createClient
  ); /* POST /api/gestion/client         -> Creates a new client               */
  gestionRouter.put(
    '/client',
    gestionController.updateClient
  ); /* PUT  /api/gestion/client         -> Updates an existing client         */
  gestionRouter.get(
    '/game',
    gestionController.getGames
  ); /* GET  /api/gestion/game(?query)   -> Returns all games matching query   */

  gestionRouter.post(
    '/sale',
    gestionController.registerSale
  ); /* POST /api/gestion/sale           ->  Returns transaction and deposit data */

  gestionRouter.get(
    '/client/realgames',
    gestionController.getRealGamesByClient
  ); /* GET /api/gestion/client/realgames  ->  Returns reals games own by a specific client */
  /*
  gestionRouter.get('/client/due', gestionController.due);
  gestionRouter.get('/client/withdraw', gestionController.withdraw);
  gestionRouter.get('/promocode', gestionController.promocode);
  gestionRouter.get('/fees', gestionController.fees);
  gestionRouter.get('/balance/due', gestionController.dueSellers);
  gestionRouter.get('/balance/deposit-fees', gestionController.deposit_fees);
  gestionRouter.get('/commissions', gestionController.commissions);
  gestionRouter.get('/transactions', gestionController.transactions);
*/
  return gestionRouter;
}

module.exports = gestionRoutes;
