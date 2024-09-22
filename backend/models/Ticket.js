const mongoose = require('mongoose');

// Create the Ticket schema
const TicketSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, required: true },
  email: { type: String, required: true, match: [/.+\@.+\..+/, 'Please enter a valid email address'] }, // Add customer email field
  date: { type: Date, default: Date.now }, // Automatically set to the current date and time
  solution: { type: String },
  isComplete: { type: Boolean, default: false },
  ticketID: { type: String, unique: true }, // Custom ticket ID field
});

// Pre-save hook to generate a ticket ID in the format "TIC0001"
TicketSchema.pre('save', async function (next) {
  if (!this.ticketID) {
    const count = await mongoose.model('Ticket').countDocuments(); // Count existing tickets
    const ticketCount = count + 1; // Increment for the new ticket
    const paddedCount = ticketCount.toString().padStart(4, '0'); // Zero-padding for 4 digits
    this.ticketID = `TIC${paddedCount}`; // Set the custom ticket ID
  }
  next();
});

// Create the Ticket model
const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;
