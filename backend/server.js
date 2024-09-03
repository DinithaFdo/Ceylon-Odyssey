const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Add this line to import the path module
require('dotenv').config();

import('./config/db.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

const EquipmentRouter = require('./routes/Equipment.js');

app.use('/EquipmentImages', express.static(path.join(__dirname, 'EquipmentImages')));

app.use('/equipment', EquipmentRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
