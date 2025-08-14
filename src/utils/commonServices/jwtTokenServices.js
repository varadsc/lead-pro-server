const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (payload) => {
	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' });
}

const verifyToken = (token) => {
	return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { generateToken, verifyToken };
