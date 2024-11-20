const express = require('express');
const depositController = require('../../controllers/gestionsubcontrollers/depositController.js');

function depositRoutes() {
  const depositRouter = express.Router();

  depositRouter.get(
    '/client',
    depositController.getClientByEmail
  ); /* GET /api/gestion/deposit/client              ->  Returns client_id                    */

  depositRouter.post(
    '/client',
    depositController.registerClient
  ); /* POST /api/gestion/deposit/client             ->  Returns client_id                    */

  depositRouter.post(
    '/register',
    depositController.registerDeposit
  ); /* POST /api/gestion/deposit/register           ->  Returns transaction and deposit data */

  return depositRouter;
}

module.exports = depositRoutes;
