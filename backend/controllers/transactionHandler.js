const express = require('express');
const router = express.Router();
const Wallet = require('../models/Wallet');
const User = require('../models/User');


router.get('/', async (req, res) => {
    try {
        const wallets = await Wallet.find({}).populate('userId', 'firstName lastName'); 
        
        const walletsWithFullName = wallets.map(wallet => {
            const userName = wallet.userId 
                ? `${wallet.userId.firstName} ${wallet.userId.lastName}` 
                : 'Unknown User';

            return {
                ...wallet.toObject(),
                userName,
            };
        });

        res.status(200).json(walletsWithFullName);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/add-transaction', async (req, res) => {
    const { userId, amount, type, status } = req.body;
    try {
        const wallet = await Wallet.findOneAndUpdate(
            { userId },
            {
                $push: {
                    transactionHistory: { amount, type, status, date: new Date() }
                },
                $inc: { walletBalance: type === 'Debit' ? -amount : amount } 
            },
            { new: true, upsert: true } 
        );
        res.status(201).json(wallet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding transaction', error });
    }
});


router.patch('/:walletId/transaction/:transactionId', async (req, res) => {
    const { walletId, transactionId } = req.params;
    const { status } = req.body;

    try {
        const wallet = await Wallet.findById(walletId);
        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }

        const transaction = wallet.transactionHistory.id(transactionId);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        
        const previousStatus = transaction.status;

        
        transaction.status = status;

   
        if (status === 'Success' && previousStatus !== 'Success') {
            wallet.walletBalance += transaction.amount; 
        } else if (status === 'Failed' && previousStatus !== 'Failed') {
            wallet.walletBalance -= transaction.amount; 
        }

        await wallet.save();

        res.status(200).json({ message: 'Transaction status updated successfully' });
    } catch (error) {
        console.error("Error updating transaction status:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/:walletId/transaction/:transactionId', async (req, res) => {
    const { walletId, transactionId } = req.params;
    try {
        const wallet = await Wallet.findById(walletId);
        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }

        const transaction = wallet.transactionHistory.id(transactionId);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

     
        wallet.walletBalance -= transaction.amount;

        wallet.transactionHistory.pull(transactionId);
        await wallet.save();
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
