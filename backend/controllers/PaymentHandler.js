const express = require('express');
const md5 = require('crypto-js/md5');
const router = express.Router();

function generateHash(data) {
    const { merchantId, orderId, amount, currency, merchantSecret } = data;
    const hashedSecret = md5(merchantSecret).toString().toUpperCase();
    const amountFormatted = parseFloat(amount).toFixed(2).replace('.', '');
    const hash = md5(merchantId + orderId + amountFormatted + currency + hashedSecret).toString().toUpperCase();
    return hash;
}

router.get('/', (req, res) => {
    const data = {
        merchantId: '1222304',
        return_url: 'http://localhost:3000/',
        cancel_url: 'http://localhost:3000/',
        notify_url: 'http://sample.com/notify',
        merchantSecret: 'MjQ0NTY4ODIzNzMzMzvds4NDdvMzk2NTQwMjA2MDQyMzM1OA=',
        first_name: 'Akila',
        last_name: 'Gunasekara',
        email: 'akilagunasekara@gmail.com',
        phone: '0770473392',
        address: 'No.1, Galle Road',
        city: 'Colombo',
        country: 'Sri Lanka',
        orderId: '12345',
        items: 'Chair',
        currency: 'LKR',
        amount: 5000,
    };

    const hash = generateHash(data);

    const responseData = {
        ...data,
        hash: hash,
    };

    res.send(responseData);
    console.log(`Server Data is ${responseData}`);
});

module.exports = router;