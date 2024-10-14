const express = require('express');
const { createBooking, getBookings, getAllBookings, updateBookingStatus } = require('../Controller/bookingController');
const router = express.Router();

router.post('/' , createBooking)
router.get('/' , getBookings)
router.get('/all' , getAllBookings)
router.patch('/:id', updateBookingStatus)

module.exports = router;