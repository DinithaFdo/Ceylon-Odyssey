const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    // Check if Authorization header exists and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // Extract the token from the Authorization header
        const token = req.headers.authorization.split(' ')[1];

        // Check if the token exists
        if (!token) {
            console.log('Token is null');
            return res.status(401).json({ message: 'Token is empty' });
        }

        // Verify the token using JWT
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log('Invalid token or expired token');
                return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
            }

            // Attach the decoded token (which contains the user info) to the request object
            req.user = decoded;
            next();
        });

    } else {
        console.log('Authorization header is missing or incorrect');
        res.status(401).json({ message: 'Unauthorized: No token provided or wrong format' });
    }
};

module.exports = authMiddleware;
