const express = require('express');
const treasuryController = require('../../controllers/gestionsubcontrollers/treasuryController.js');

function treasuryRoutes() {
  const treasuryRouter = express.Router();

  treasuryRouter.get(
    '/fees',
    treasuryController.getDepositFees
  ); /* GET /api/gestion/fees  ->  Returns total fees for a specific session  */

  treasuryRouter.get(
    '/balance/due',
    treasuryController.getDue
  ); /* GET /api/gestion/balance/due  ->  Returns total due to sellers for a specific session  */

  treasuryRouter.get(
    '/commissions',
    treasuryController.getCommissions
  ); /* GET /api/gestion/commissions  ->  Returns total commissions collected in a specific session  */

  treasuryRouter.get(
    '/paid',
    treasuryController.getPaidAmount
  ); /* GET /api/gestion/paid  ->  Returns total paid seller in a specific session  */

  treasuryRouter.get(
    '/treasury',
    treasuryController.getTreasury
  ); /* GET /api/gestion/paid  ->  Returns treasury (Commission + Due + Fees - Paid) in a specific session  */

  return treasuryRouter;
}

module.exports = treasuryRoutes;
