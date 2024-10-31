const express = require('express');
const adminController = require('../controllers/adminController');

function adminRoutes() {
  const adminRouter = express.Router();
  adminRouter.post(
    '/session',
    adminController.createSession
  ); /* POST   /api/admin/session  -> Creates new session      */
  adminRouter.put(
    '/session',
    adminController.updateSession
  ); /* PUT    /api/admin/session  -> Updates existing session */
  adminRouter.delete(
    '/session',
    adminController.deleteSession
  ); /* DELETE /api/admin/session  -> Deletes existing session */
  adminRouter.delete(
    '/client',
    adminController.deleteClient
  ); /* DELETE /api/admin/client   -> Deletes existing client  */
  adminRouter.post(
    '/game',
    adminController.createGame
  ); /* POST   /api/admin/game     -> Creates new game         */
  adminRouter.put(
    '/game',
    adminController.updateGame
  ); /* PUT    /api/admin/game     -> Updates existing game    */
  adminRouter.delete(
    '/game',
    adminController.deleteGame
  ); /* DELETE /api/admin/game     -> Deletes existing game    */

  return adminRouter;
}

module.exports = adminRoutes;
