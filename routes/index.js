const express = require('express');
//const verifyToken = require('../middleware/authMiddleware');
//const rateLimit = require('express-rate-limit');

function routes() {
	const router = express.Router();
	return router;
}

module.exports = { routes };
