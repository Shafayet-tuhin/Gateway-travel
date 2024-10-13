const Booking = require('../Model/booking.model');


exports.createBooking = async (req, res) => {
    try {
        
        const { email, placeImg, placeTitle, checkInDate, checkOutDate, guests, totalPrice } = req.body;
        
        const newBooking = new Booking({
            email,
            placeImg,
            placeTitle,
            checkInDate,
            checkOutDate,
            guests,
            totalPrice,
        });

        const savedBooking = await newBooking.save();
        res.status(200).json({ message: 'Booking successful', booking: savedBooking });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
