const express = require('express');
const { createPlace, getAllPlaces, getSinglePlace, allPlaces } = require('../Controller/placeController');
const router = express.Router();

router.post('/', createPlace)
router.get('/', getAllPlaces)
router.get('/all', allPlaces)
router.get('/:id', getSinglePlace)

module.exports = router;