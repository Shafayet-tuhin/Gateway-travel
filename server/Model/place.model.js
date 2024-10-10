const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    photos: [
        {
            type: String,
            required: true
        }
    ],
    placeTypes: {
        type: String,
        required: true
    },
    totalGuests: {
        type: Number,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    reviews: [
        {
            reviewerName: { type: String },
            rating: { type: Number, min: 1, max: 5 },
            comment: { type: String },
            date: { type: Date, default: Date.now }
        }
    ],
    averageRating: {
        type: Number,
        default: 0
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

// Create the model
const Place = mongoose.model('place', placeSchema);

module.exports = Place;
