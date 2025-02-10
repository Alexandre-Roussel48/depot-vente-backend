const express = require('express');
const gestionController = require('../controllers/gestionController');

const saleRoutes = require('./gestionsubroutes/saleRoutes');
const depositRoutes = require('./gestionsubroutes/depositRoutes');
const treasuryController = require('../controllers/gestionsubcontrollers/treasuryController.js');

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

  gestionRouter.post(
    '/client-info',
    gestionController.getClientInfos
  ); /* POST /api/gestion/client-info          -> Returns client infos matching id and session*/

  gestionRouter.post(
    '/client-list',
    gestionController.getClientsByStartEmail
  ); /* GET /api/gestion/client-list          -> Returns client-list with the start of an email */

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
    '/transactions',
    gestionController.transactions
  ); /* GET /api/gestion/transactions  ->  Returns total transactions in the current session  */

  gestionRouter.use('/sale', saleRoutes());

  gestionRouter.use('/deposit', depositRoutes());

  gestionRouter.get(
    '/fees',
    treasuryController.getDepositFees
  ); /* GET /api/gestion/fees  ->  Returns total fees for a specific session  */

  gestionRouter.get(
    '/balance/due',
    treasuryController.getDue
  ); /* GET /api/gestion/balance/due  ->  Returns total due to sellers for a specific session  */

  gestionRouter.get(
    '/commissions',
    treasuryController.getCommissions
  ); /* GET /api/gestion/commissions  ->  Returns total commissions collected in a specific session  */

  gestionRouter.get(
    '/paid',
    treasuryController.getPaidAmount
  ); /* GET /api/gestion/paid  ->  Returns total paid seller in a specific session  */

  gestionRouter.get(
    '/treasury',
    treasuryController.getTreasury
  ); /* GET /api/gestion/treasury  ->  Returns treasury (Commission + Due + Fees - Paid) in a specific session  */

  return gestionRouter;
}

module.exports = gestionRoutes;
