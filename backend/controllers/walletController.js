const Wallet = require('../models/Wallet');

exports.getWalletDetails = async (req, res) => {
    try {
        const userId = req.user.id;

        const wallet = await Wallet.findOne({ userId });

        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }

        // Calculate the total amount of successful transactions
        const successfulTransactionsTotal = wallet.transactionHistory.reduce((total, transaction) => {
            return transaction.status === 'Success' ? total + transaction.amount : total;
        }, 0);

        // Send wallet details including the total of successful transactions
        res.status(200).json({
            ...wallet._doc,  // Spread the existing wallet document properties
            successfulTransactionsTotal,  // Add the new calculated field
        });
    } catch (err) {
        console.error(err);
        res.status(403).json({ message: 'Forbidden' });
    }
};
