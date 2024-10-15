import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Nav from '../Navbar/Nav';
import Footer from '../Footer/Footer';
import { FaStar, FaBed, FaBath, FaWifi, FaTv, FaCar, FaSnowflake } from 'react-icons/fa'; // Importing new icons
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch } from 'react-redux';
import { addBooking } from '../../../Redux/bookingSlice';

const PlaceDetails = () => {
  const data = useLoaderData();
  const { email } = useSelector((state) => state.user);
 
  const dispatch = useDispatch();



  const [currImage, setCurrImage] = useState(data.photos[0]);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotal = () => {
    const nights = checkOutDate && checkInDate ? (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24) : 0;
    return nights * data.price;
  };

  const bookNow = async () => {
    if (!checkInDate || !checkOutDate) {
      Swal.fire({
        icon: 'error',
        title: 'Please select check-in and check-out dates',
      });
      return;
    }

    if (checkInDate >= checkOutDate) {
      Swal.fire({
        icon: 'error',
        title: 'Check-out date must be greater than check-in date',
      });
      return;
    }

    if (adults + children === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Please select at least one guest',
      });
      return;
    }

    if (adults + children > data.totalGuests) {
      Swal.fire({
        icon: 'error',
        title: 'Number of guests exceeds the limit',
      });
      return;
    }

    const stipe = await loadStripe('pk_test_51PZatGRsm6LHkTC74ZBxGtIY87X1MwAfgVcHEShUmrZ052LplogAOAt4xendLf0X8zDksXIjn2mnHtbnTKpVmTJn001wj5dRs4')

    const item = {
      email: email,
      placeImg: data.photos[0],
      placeTitle: data.title,
      totalPrice: calculateTotal(),
    }

    const response = await fetch('https://gateway-pink-nine.vercel.app/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })

    const session = await response.json();

    const result = stipe.redirectToCheckout({
      sessionId: session.id
    })


    if (result.error) {
      Swal.fire({
        icon: 'error',
        title: 'Payment failed',
        text: result.error.message,
      });
    }

    const totalAmount = calculateTotal(); 

    const bookingData = {
      email: email,
      placeImg: data.photos,
      placeTitle: data.title,
      checkInDate,
      checkOutDate,
      guests: adults + children,
      totalPrice: totalAmount,
    };

    localStorage.setItem('bookingData', JSON.stringify(bookingData));
    dispatch(addBooking(bookingData));


  };


 

  return (
    <div className="min-h-screen font-abc2">
      <Nav />

      <div className="max-w-7xl mx-auto p-6">
        {/* Title and Rating */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{data.title}</h1>
          <div className="flex gap-4 items-center">
            <p className="flex gap-1 items-center text-yellow-400">
              <FaStar /> {data.averageRating.toFixed(2)}
            </p>
            <p className="text-blue-400">{data.location}, {data.country}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Image Gallery */}
          <div className="w-full border shadow-2xl p-6 rounded-2xl">
            <img src={currImage} alt="current" className="w-full h-[400px] object-cover rounded-lg mb-4" />
            <div className="flex gap-2 overflow-x-scroll">
              {data.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`thumbnail-${index}`}
                  onClick={() => setCurrImage(photo)}
                  className={`w-[8rem] h-[8rem] object-cover cursor-pointer rounded-lg transition duration-200 ease-in-out transform hover:scale-105 ${currImage === photo ? 'border-4 border-blue-500' : ''}`}
                />
              ))}
            </div>
          </div>

          {/* Booking Section */}
          <div className="p-6 rounded-2xl border shadow-2xl">
            <div className="text-2xl font-bold mb-4">${data.price} / Night</div>

            {/* Date Pickers */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="mb-4">
                <label className="block mb-2">Check-in</label>
                <DatePicker
                  selected={checkInDate}
                  onChange={(date) => setCheckInDate(date)}
                  className="w-full p-2 rounded border"
                  placeholderText="Select check-in date"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Check-out</label>
                <DatePicker
                  selected={checkOutDate}
                  onChange={(date) => setCheckOutDate(date)}
                  className="w-full p-2 rounded border"
                  placeholderText="Select check-out date"
                />
              </div>
            </div>

            {/* Guests Selection */}
            <div className="mb-4 py-8">
              <div className="flex flex-col mb-4">
                <label className="mb-2">Adults</label>
                <div className="flex items-center justify-between w-full border p-2 rounded-lg">
                  <button
                    onClick={() => setAdults(Math.max(0, adults - 1))} // Prevent going below 0
                    className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
                  >
                    -
                  </button>
                  <span>{adults}</span>
                  <button
                    onClick={() => setAdults(adults + 1)}
                    className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="mb-2">Children</label>
                <div className="flex items-center justify-between w-full border p-2 rounded-lg">
                  <button
                    onClick={() => setChildren(Math.max(0, children - 1))} // Prevent going below 0
                    className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
                  >
                    -
                  </button>
                  <span>{children}</span>
                  <button
                    onClick={() => setChildren(children + 1)}
                    className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <p className="text-2xl font-bold text-orange-400 mb-4">
              Maximum guests: {data.totalGuests}
            </p>

            {/* Total Price Calculation */}
            <div className="flex justify-between items-center text-lg font-semibold mb-4">
              <span className="text-2xl">Total Price:</span>
              <span className="text-red-500 text-2xl">${calculateTotal().toFixed(2)}</span>
            </div>

            <button className="bg-blue-600 w-full py-2 text-white rounded hover:bg-blue-700" onClick={bookNow}>
              Book Now
            </button>
          </div>
        </div>

        {/* Description and Amenities */}
        <div className="mt-8">
          <h1 className="text-2xl font-bold mb-4">Description</h1>
          <p className="mb-6 text-xl">{data.description}</p>

          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-4">
            {/* Dynamic icons for amenities */}
            <div className="flex items-center gap-2 lg:text-2xl">
              <FaBed className="text-blue-500" /> <span className='text-lg'>{data.bedrooms} Bedrooms</span>
            </div>
            <div className="flex items-center gap-2 lg:text-2xl">
              <FaBath className="text-blue-500" /> <span className='text-lg'>{data.bathrooms} Bathrooms</span>
            </div>
            <div className="flex items-center gap-2 lg:text-2xl">
              <FaWifi className="text-blue-500" /> <span className='text-lg'>WiFi</span>
            </div>
            <div className="flex items-center gap-2 lg:text-2xl">
              <FaSnowflake className="text-blue-500" /> <span className='text-lg'>AC</span>
            </div>
            <div className="flex items-center gap-2 lg:text-2xl">
              <FaTv className="text-blue-500" /> <span className='text-lg'>TV</span>
            </div>
            <div className="flex items-center gap-2 lg:text-2xl">
              <FaCar className="text-blue-500" /> <span className='text-lg'>Parking</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PlaceDetails;
