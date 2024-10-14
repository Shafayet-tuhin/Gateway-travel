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

exports.getBookings = async (req, res) => {
    try {
        const email = req.query.email;

        const bookings = await Booking.find({ email });

        res.status(200).json({ bookings });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();

        res.status(200).json({ bookings });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateBookingStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body;

        await Booking.findByIdAndUpdate(id, { status }, { new: true });

        const result = await Booking.find()

        res.status(200).json({ message: 'success', result});
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}