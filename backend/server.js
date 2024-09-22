const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

import('./config/db.js'); // Ensure database connection setup

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5010;

// Import routes
const ticketRouter = require('./routes/ticket');
const supportAgentRouter = require('./routes/supportAgent'); // Uncomment if support agent routes are available

// Use routes
app.use('/tickets', ticketRouter);
app.use('/support-agents', supportAgentRouter); // Uncomment if support agent routes are available

// Optional: Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
