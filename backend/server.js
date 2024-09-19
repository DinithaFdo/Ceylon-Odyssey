const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

import('./config/db.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5010;

// Import routes
const ticketRouter = require('./routes/ticket');
const supportAgentRouter = require('./routes/supportAgent'); // Import support agent routes

// Use routes
app.use('/tickets', ticketRouter);
app.use('/support-agents', supportAgentRouter); // Use support agent routes

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
