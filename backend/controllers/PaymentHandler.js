const express = require('express');
const md5 = require('crypto-js/md5');
const { v4: uuidv4 } = require('uuid'); 
const router = express.Router();
require('dotenv').config();

const { MERCHANT_ID, MERCHANT_SECRET } = process.env;

let paymentData;

function generateHash(data) {
    const { merchantId, orderId, amount, currency, merchantSecret } = data;
    const hashedSecret = md5(merchantSecret).toString().toUpperCase();
    const amountFormatted = parseFloat(amount).toLocaleString('en-us', { minimumFractionDigits: 2 }).replaceAll(',', '');
    const hash = md5(merchantId + orderId + amountFormatted + currency + hashedSecret).toString().toUpperCase();
    return hash;
}


router.post('/create-payment', (req, res) => {
    const {
        amount,
        first_name,
        last_name,
        email,
        phone,
        address,
        city,
        currency = 'LKR',
        userId,
    } = req.body;

    
    const orderId = uuidv4(); 

    paymentData = {
        merchantId: '1228302',
        return_url: 'http://localhost:5173/profile',
        cancel_url: 'http://localhost:5173/profile',
        notify_url: 'http://localhost:5173/profile',
        merchantSecret: 'NzU3NDA5MjQyMzE1MDY1ODIyNjA0OTEzMzgzNzcwNDE2OTkz',
        first_name,
        last_name,
        email,
        phone,
        address,
        city,
        country: 'Sri Lanka',
        orderId,
        items: 'Wallet Top-up',
        currency,
        amount,
        userId,
    };

    const hash = generateHash(paymentData);
    paymentData.hash = hash;

    res.json(paymentData); 
    console.log(`Payment Creation Data is ${JSON.stringify(paymentData)}`);
});

router.get('/', (req, res) => {
    if (!paymentData) {
        return res.status(404).json({ message: 'No payment data found. Please create a payment first.' });
    }
    res.json(paymentData);
});

module.exports = router;
