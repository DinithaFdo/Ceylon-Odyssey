const mongoose = require('mongoose');
const { Schema } = mongoose;

const walletSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  walletBalance: {
    type: Number,
    default: 0
  },
  transactionHistory: [
    {
      amount: Number,
      type: { type: String, enum: ['credit', 'debit'] },
      date: { type: Date, default: Date.now }
    }
  ]
});

const Wallet = mongoose.model('Wallet', walletSchema);
module.exports = Wallet;
