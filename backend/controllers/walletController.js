const Wallet = require('../models/Wallet');

exports.getWalletDetails = async (req, res) => {
    try {
        const userId = req.user.id;

        const wallet = await Wallet.findOne({ userId });

        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }

        res.status(200).json(wallet);
    } catch (err) {
        console.error(err);
        res.status(403).json({ message: 'Forbidden' });
    }
};
