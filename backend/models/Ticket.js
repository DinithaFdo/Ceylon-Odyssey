const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// create the Ticket schema
const TicketSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, required: true },
  date: { type: Date, required: true },
  solution: { type: String },
  isComplete: { type: Boolean, default: false }
});

// Add auto-increment field for ticket ID
TicketSchema.plugin(AutoIncrement, { inc_field: 'ticketID' });

// Create the Ticket model
const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;
