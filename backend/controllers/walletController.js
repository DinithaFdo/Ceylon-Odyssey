const jwt = require('jsonwebtoken');
const Wallet = require('../models/Wallet');

exports.getWalletDetails = async (req, res) => {
    const { token } = req.cookies;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const wallet = await Wallet.findOne({ userId: decoded.id });

            if (!wallet) {
                return res.status(404).json({ message: 'Wallet not found' });
            }

            res.status(200).json(wallet);
        } catch (err) {
            res.status(403).json({ message: 'Forbidden' });
        }
    } else {
        res.status(401).json({ message: 'No token provided' });
    }
};
