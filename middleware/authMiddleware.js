const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  if (typeof req.cookies.authToken !== 'undefined') {
    const bearerToken = req.cookies.authToken;
    jwt.verify(bearerToken, process.env.SECRET_KEY, (err, authData) => {
      if (err) {
        res.status(403).json({ status: 'Token is wrong' });
      } else {
        req.authData = authData;
	// Implement refresh token
        next();
      }
    });
  } else {
    res.status(403).json({ status: 'Token is not set' });
  }
}

module.exports = verifyToken;
