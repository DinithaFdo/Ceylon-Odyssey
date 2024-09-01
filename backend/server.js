const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

import('./config/db.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5001;

const destinationRouter = require('./routes/destination');

app.use('/destination', destinationRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
