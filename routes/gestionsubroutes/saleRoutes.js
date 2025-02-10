const express = require('express');
const saleController = require('../../controllers/gestionsubcontrollers/saleController.js');

function saleRoutes() {
  const saleRouter = express.Router();

  saleRouter.get(
    '/realgames',
    saleController.getRealGamesForSale
  ); /* POST /api/gestion/sale/realgames(?query)  ->  Returns realgames by id             */

  saleRouter.post(
    '/register',
    saleController.registerSale
  ); /* POST /api/gestion/sale/register           ->  Returns transaction and deposit data */

  return saleRouter;
}

module.exports = saleRoutes;
