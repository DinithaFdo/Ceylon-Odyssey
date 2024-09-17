const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
    referredUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    referredUserName: { type: String, required: true },
    referringUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    referringUserName: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Referral', referralSchema);
