const express = require('express');
const { createBooking, getBookings } = require('../Controller/bookingController');
const router = express.Router();

router.post('/' , createBooking)
router.get('/' , getBookings)

module.exports = router;