const express = require('express');
const { createPlace, getAllPlaces, getSinglePlace } = require('../Controller/placeController');
const router = express.Router();

router.post('/', createPlace)
router.get('/', getAllPlaces)
router.get('/:id', getSinglePlace)

module.exports = router;