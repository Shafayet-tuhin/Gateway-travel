const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Booking schema
const bookingSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    placeImg : [
        {
            type: String,
            required: true
        }
    ],
    placeTitle: {
        type: String,
        required: true,
    },
    checkInDate: {
        type: Date,
        required: true,
    },
    checkOutDate: {
        type: Date,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    guests: {
        type: Number,
        required: true,
    },
    bookingDate:{
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending',
    },
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

// Create the Booking model
const Booking = mongoose.model('booking', bookingSchema);

module.exports = Booking;
 