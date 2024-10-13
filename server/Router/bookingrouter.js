const express = require('express');
const { createBooking } = require('../Controller/bookingController');
const router = express.Router();

router.post('/' , createBooking)

module.exports = router;