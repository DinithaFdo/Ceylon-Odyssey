const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');
const { getWalletDetails } = require('../controllers/walletController');
const { getReferralDetails } = require('../controllers/referralController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/profile', getUserProfile);
router.get('/wallet', getWalletDetails);
router.get('/referrals', getReferralDetails);



module.exports = router;
