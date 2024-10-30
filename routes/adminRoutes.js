const express = require('express');
const adminController = require('../controllers/adminController');

function adminRoutes() {
  const adminRouter = express.Router();
  adminRouter.post('/session', adminController.createSession);
  adminRouter.put('/session', adminController.updateSession);
  adminRouter.delete('/session', adminController.deleteSession);
  adminRouter.delete('/client', adminController.deleteClient);
  adminRouter.post('/games', adminController.createGame);
  adminRouter.put('/games', adminController.updateGame);
  adminRouter.delete('/games', adminController.deleteGame);

  return adminRouter;
}

module.exports = adminRoutes;
