import React from 'react';
import Slider from 'react-slick';  // Import Slider component
import { FaLocationDot } from "react-icons/fa6";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaDeaf } from 'react-icons/fa';

const SIinglePlace = ({ item }) => {
  // Slick settings for the carousel
  const settings = {
    dots: true,               // Show dots navigation
    infinite: true,           // Loop the images
    speed: 1500,               // Speed of transition
    slidesToShow: 1,          // Number of slides to show at once
    slidesToScroll: 1,        // Number of slides to scroll at once
    autoplay: true,           // Auto-play the slides
    autoplaySpeed: Math.random() * 1000 + 4000,    // Time before sliding to next image (in milliseconds)
    // vertical :true,
    // fade:true,

  };

  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg font-abc2">
      {/* Image Carousel */}
      <Slider {...settings}>
        {item.photos.map((photo, index) => (
          <div key={index}>
            <img src={photo} alt={item.location} className="w-full object-cover lg:h-[17rem]" />
          </div>
        ))}
      </Slider>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition duration-300">
        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold text-white mb-1 flex gap-2"> <FaLocationDot className='text-orange-400 animate-bounce' />{item.location}</h3>

        {/* Country */}
        <p className="text-lg font-semibold text-sky-300 mb-2">{item.country}</p>

        {/* Price */}
        <p className="text-xl md:text-3xl font-extrabold text-yellow-400 mb-2">
          ${item.price} <span className="text-sm font-normal text-yellow-200">/ Night</span>
        </p>

        {/* Dates */}
        <p className="text-sm text-gray-300">August 11 - December 26</p>

        {/* Button */}
        <a
          href={`/details/${item.id}`}
          className="btn bg-yellow-400 font-abc2 text-lg mt-4"
        >
          View Details
        </a>
      </div>
    </div>
  )
};

export default SIinglePlace;
