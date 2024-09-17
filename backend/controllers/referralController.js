const jwt = require('jsonwebtoken');
const Referral = require('../models/Referral');

exports.getReferralDetails = async (req, res) => {
    const { token } = req.cookies;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const referrals = await Referral.find({ referringUserId: decoded.id });

            if (!referrals) {
                return res.status(404).json({ message: 'No referrals found' });
            }

            res.status(200).json(referrals);
        } catch (err) {
            res.status(403).json({ message: 'Forbidden' });
        }
    } else {
        res.status(401).json({ message: 'No token provided' });
    }
};
