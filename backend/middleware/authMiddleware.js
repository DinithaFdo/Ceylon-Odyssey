const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to check if the user is authenticated - Dinitha
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token; 

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.user = user; 
        next();
    });
};

module.exports = authMiddleware;
