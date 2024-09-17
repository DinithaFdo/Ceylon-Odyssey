const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getUserProfile = async (req, res) => {
    
    const { token } = req.cookies;

    if (token) {
        try {
          
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            const user = await User.findById(decoded.id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json(user);
        } catch (err) {
            
            res.status(403).json({ message: 'Forbidden' });
        }
    } else {
        res.status(401).json({ message: 'No token provided' });
    }
};

