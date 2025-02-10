function verifyAdmin(req, res, next) {
  // Assuming req.user contains the user data
  if (req.authData && req.authData.role === 'ADMIN') {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden: Admins only' }); // User is not an admin
  }
}

module.exports = verifyAdmin;
