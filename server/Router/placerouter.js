const express = require('express');
const { createPlace, getAllPlaces } = require('../Controller/placeController');
const router = express.Router();

router.post('/', createPlace)
router.get('/', getAllPlaces)

module.exports = router;