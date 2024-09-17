const express = require('express');

const User = require('../models/User');
const Referral = require('../models/Referral');
const Wallet = require('../models/Wallet');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const CookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();

app.use(CookieParser());

const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
    const { name, email, password, referralCode } = req.body;

    try {
        if (!(email && password && name)) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        let validReferralCode = null;
        if (referralCode) {
            
            validReferralCode = await User.findOne({ referralCode });
            if (!validReferralCode) {
                return res.status(400).json({ message: 'Referral code is not valid. Please check it again or register without the referral code.' });
            }
        }

        const newReferralCode = uuidv4().split('-')[0].toUpperCase();
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            referralCode: newReferralCode
        });

        await newUser.save();

        // Create a wallet for the new user
        const newWallet = new Wallet({
            userId: newUser._id,
            walletBalance: 0,
            transactionHistory: []
        });

        await newWallet.save();

        if (validReferralCode) {
            // Update the wallets for both users
            const referringUserWallet = await Wallet.findOne({ userId: validReferralCode._id });
            const newUserWallet = await Wallet.findOne({ userId: newUser._id });

            const transactionAmount = 1000;

            // Update referring user's wallet
            referringUserWallet.walletBalance += transactionAmount;
            referringUserWallet.transactionHistory.push({
                amount: transactionAmount,
                type: 'credit',
                date: new Date()
            });
            await referringUserWallet.save();

            // Update new user's wallet
            newUserWallet.walletBalance += transactionAmount;
            newUserWallet.transactionHistory.push({
                amount: transactionAmount,
                type: 'credit',
                date: new Date()
            });
            await newUserWallet.save();

            // Create a referral record
            const referral = new Referral({
                referredUserId: newUser._id,
                referredUserName: newUser.name,
                referringUserId: validReferralCode._id,
                referringUserName: validReferralCode.name,
                date: new Date()
            });
            await referral.save();
        }

        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            JWT_SECRET,
            { expiresIn: '30d' }
        );

        newUser.password = undefined;

        res.status(201).json({ 
            message: 'User registered successfully',
            user: newUser,
            token,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!(email && password)) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        console.log('Received email:', email);

        const user = await User.findOne({ email });

        console.log('Retrieved user:', user);

        if (!user) {
            return res.status(400).json({ message: 'No account is matching for this email' });
        }

        console.log('Password provided:', password);
        console.log('Stored hashed password:', user.password);

        const isMatch = await bcrypt.compare(password, user.password);

        console.log('Password match:', isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: 'Please re-check your password' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        console.log('Generated token:', token);

        user.password = undefined; 
        
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
           .status(201)
           .json({ token, user });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = { registerUser, loginUser };