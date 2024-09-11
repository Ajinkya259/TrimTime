const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY; // Access the secret key from .env

// Middleware function to authenticate the JWT token
const authenticateToken = (req, res, next) => {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer token

    if (token == null) return res.status(401).json({ message: 'Token required' });

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        
        req.user = user; // Attach user information to the request
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authenticateToken;
