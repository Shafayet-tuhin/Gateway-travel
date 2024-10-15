const express = require('express');
const router = express.Router();
const Stripe = require('stripe')(process.env.PAYMENT_KEY);

router.post('/', async (req, res) => {
    const { email,placeImg,placeTitle,totalPrice} = req.body;

    const Items = [
        {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: placeTitle,
                    images: [placeImg],
                    description: "Demo Card : 4242 4242 4242 4242, Exp: any future date, CVV: any 3 digits",
                },
                unit_amount: totalPrice * 100,
            },
            quantity: 1,
        },
    ];

    const session = await Stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: Items,
        mode: 'payment',
        success_url: 'http://localhost:5173/success',
        cancel_url: 'http://localhost:5173/cancel',
    })

    res.json({ id: session.id });

})

module.exports = router;