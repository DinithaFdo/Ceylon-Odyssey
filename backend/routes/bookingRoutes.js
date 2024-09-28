const express = require('express');
const {getAllBookings, createBooking, getBooking, updateBooking, deleteBooking} = require('../controllers/bookingController');
const router = express.Router();

router.post('/', createBooking);
router.get('/:id', getBooking);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);
router.get('/', getAllBookings); 

module.exports = router;

