const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const preferenceRoutes = require('./controllers/preferenceController');
const adminRoutes = require('./controllers/userHanlder.js');
const transaction = require('./controllers/transactionHandler.js');
const referrals = require('./controllers/refHandler.js');
const bodyParser = require('body-parser');
const path = require('path'); 
const Payment = require('./controllers/PaymentHandler.js');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const path = require('path');


import('./config/db.js');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/user', preferenceRoutes);
app.use('/api/user', adminRoutes);
app.use('/api/transaction', transaction);
app.use('/api/referral', referrals);
app.use('/api/payment', Payment);


const PORT = process.env.PORT || 5000;

const EquipmentRouter = require('./routes/Equipment.js');
app.use('/EquipmentImages', express.static(path.join(__dirname, 'EquipmentImages')));
app.use('/equipment', EquipmentRouter);


app.use('/TourPackageImages', express.static(path.join(__dirname, 'TourPackageImages')));
const tourPackageRouter = require('./routes/tourPackages.js');
app.use('/tourPackage', tourPackageRouter);


const BlogRouter = require('./routes/Blog.js');
app.use('/BlogImages', express.static(path.join(__dirname, 'BlogImages')));
app.use('/Blog', BlogRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});