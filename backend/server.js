const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const path = require('path');

import('./config/db.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/TourPackageImages', express.static(path.join(__dirname, 'TourPackageImages')));


const PORT = process.env.PORT || 5000;

const tourPackageRouter = require('./routes/tourPackages.js');
app.use('/tourPackage', tourPackageRouter);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
