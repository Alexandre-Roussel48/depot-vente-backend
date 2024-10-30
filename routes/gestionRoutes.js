const express = require('express');
const gestionController = require('../controllers/gestionController');

function gestionRoutes() {
  const gestionRouter = express.Router();
  gestionRouter.post('/login', gestionController.login);

  gestionRouter.get('/realgames', gestionController.realGames);
  gestionRouter.post('/deposit', gestionController.deposit);

  gestionRouter.get('/session', gestionController.getSessions);
  gestionRouter.get('/session/:id', gestionController.getSession);
  gestionRouter.get('/client', gestionController.getClients);
  gestionRouter.get('/client/:id', gestionController.getClient);
  gestionRouter.post('/client', gestionController.createClient);
  gestionRouter.put('/client', gestionController.updateClient);
  gestionRouter.get('/games', gestionController.getGames);
  gestionRouter.get('/games/:id', gestionController.getGame);
  /*
  gestionRouter.post('/sale', gestionController.registerSale);
  gestionRouter.get('/client', gestionController.clientId);
  gestionRouter.get('/client/realgames', gestionController.realGamesClient);
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
