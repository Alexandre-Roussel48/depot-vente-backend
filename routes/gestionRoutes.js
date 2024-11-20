const express = require('express');
const gestionController = require('../controllers/gestionController');

const saleRoutes = require('./gestionsubroutes/saleRoutes');
const depositRoutes = require('./gestionsubroutes/depositRoutes');

function gestionRoutes() {
  const gestionRouter = express.Router();

  gestionRouter.post(
    '/login',
    gestionController.login
  ); /* POST /api/gestion/login          ->  Returns a JWTToken as cookie */

  gestionRouter.get(
    '/session',
    gestionController.getSessions
  ); /* GET  /api/gestion/session        -> Returns all sessions               */
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

  gestionRouter.get(
    '/client/realgames',
    gestionController.getRealGamesByClient
  ); /* GET /api/gestion/client/realgames  ->  Returns reals games own by a specific client */

  gestionRouter.get(
    '/client/due/:id',
    gestionController.dueToSeller
  ); /* GET /api/gestion/client/due  ->  Returns due that a client can withdraw */

  gestionRouter.get(
    '/client/withdraw/:id',
    gestionController.withdraw
  ); /* GET /api/gestion/client/withdraw/:id  ->  Returns withdrawn money by seller for current session */

  gestionRouter.get(
    '/fees',
    gestionController.deposit_fees
  ); /* GET /api/gestion/fees  ->  Returns total fees for the current session  */

  gestionRouter.get(
    '/balance/due',
    gestionController.dueToSellers
  ); /* GET /api/gestion/balance/due  ->  Returns total due to sellers for the current session  */

  gestionRouter.get(
    '/balance/deposit-fees',
    gestionController.totalFees
  ); /* GET /api/gestion/balance/deposit-fees  ->  Returns total due to sellers for the current session  */

  gestionRouter.get(
    '/commissions',
    gestionController.commissions
  ); /* GET /api/gestion/commissions  ->  Returns total commissions collected in the current session  */

  gestionRouter.get(
    '/transactions',
    gestionController.transactions
  ); /* GET /api/gestion/transactions  ->  Returns total transactions in the current session  */

  gestionRouter.use('/sale', saleRoutes());
  gestionRouter.use('/deposit', depositRoutes());

  return gestionRouter;
}

module.exports = gestionRoutes;
