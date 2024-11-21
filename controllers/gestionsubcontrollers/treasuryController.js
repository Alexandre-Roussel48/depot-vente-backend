const {
  getTotalPay,
  getTotalDepositFees,
  getTotalSales,
  getTotalCommissions,
  getDue,
} = require('../../models/transactionModel');

/*=========*/
/* TRESURY */
/*=========*/

/* Returns total fees collected for a specific session
 * Params:
 * - session : Session Object
 */

exports.getDepositFees = async (req, res) => {
  try {
    const session = req.body;

    const totalFees = await getTotalDepositFees(session.id);

    res.status(200).json({ totalFees });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*   Returns withdrawn money by seller for a specific session
 * Params:
 * - session : Session Object
 */

exports.getDue = async (req, res) => {
  try {
    const session = req.body;

    const sales = await getTotalSales(session.id);

    //On cherche aussi ce qu'ils ont déjà retirer
    const alreadyWithdraw = await getTotalPay(session.id);

    const due = await getDue(sales, alreadyWithdraw);

    res.status(200).json({ due });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Returns total commissions collected for a specific session
 * Params:
 * - session : Session Object
 */

exports.getCommissions = async (req, res) => {
  try {
    const session = req.body;

    const totalCommission = await getTotalCommissions(session.id);

    res.status(200).json({ totalCommission });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Returns total amount paid to sellers for a specific session
 * Params:
 * - session : Session Object
 */

exports.getPaidAmount = async (req, res) => {
  try {
    const session = req.body;

    const totalPay = await getTotalPay(session.id);

    res.status(200).json({ totalPay });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Returns treasury (Commission + Due + Fees - Paid) in a specific session
 * Params:
 * - session : Session Object
 */

exports.getTreasury = async (req, res) => {
  try {
    const session = req.body;

    const totalPay = await getTotalPay(session.id);

    const totalCommission = await getTotalCommissions(session.id);

    const totalSale = await getTotalSales(session.id);

    const totalFees = await getTotalDepositFees(session.id);

    const treasury = totalCommission + totalSale + totalFees - totalPay;

    res.status(200).json({ treasury });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
