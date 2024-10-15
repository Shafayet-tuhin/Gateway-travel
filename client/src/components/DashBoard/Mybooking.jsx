import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaCalendarAlt, FaUsers, FaMoneyBillAlt, FaSpinner } from 'react-icons/fa';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Mybooking = () => {
  const { email } = useSelector(state => state.user);
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://gateway-pink-nine.vercel.app/booking?email=${email}`)
      .then(res => res.json())
      .then(data => {
        setBooking(data.bookings);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, [email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-6xl text-blue-500" />
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Prepare data for the chart
  const chartData = booking.map(item => ({
    date: new Date(item.checkInDate).toLocaleDateString('en-GB'),
    totalPrice: item.totalPrice
  }));

  const uniqueDates = [...new Set(chartData.map(item => item.date))];
  const aggregatedData = uniqueDates.map(date => {
    const totalForDate = chartData
      .filter(item => item.date === date)
      .reduce((acc, cur) => acc + cur.totalPrice, 0);
    return { date, totalPrice: totalForDate };
  });

  // Highcharts options for the area chart
  const chartOptions = {
    title: {
      text: 'Total Payment Overview by Date'
    },
    chart: {
      type: 'bar',
    },
    xAxis: {
      categories: aggregatedData.map(item => item.date),
      title: {
        text: 'Date'
      }
    },
    yAxis: {
      title: {
        text: 'Total Payment ($)'
      }
    },
    series: [
      {
        name: 'Total Payment',
        data: aggregatedData.map(item => item.totalPrice)
      }
    ],
    credits: {
      enabled: false
    },
  };

  return (
    <div className="min-h-screen p-8">
      <div className="text-center font-abc lg:text-5xl mt-16 mb-12">
        <h1 className="text-5xl font-bold">My Bookings</h1>
        <hr className="w-[50%] mx-auto border-2 border-blue-500 my-4" />
      </div>

      {/* Highcharts Area Chart */}
      <div className="mb-8">
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 font-abc2">
        {booking.map(item => (
          <div
            key={item._id}
            className="card rounded-lg shadow-2xl hover:shadow-orange-400 transition-shadow duration-300 shadow-cyan-300"
          >
            <figure className="relative overflow-hidden rounded-t-lg">
              <img
                src={item.placeImg[0]}
                alt={item.placeTitle}
                className="w-full lg:h-[15rem] object-cover transition-transform duration-500 hover:scale-105"
              />
            </figure>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-3">{item.placeTitle}</h2>
              <div className="flex flex-col gap-2 mb-3">
                <p className="flex items-center gap-1">
                  <FaCalendarAlt className="text-blue-500" /> Check-In: {formatDate(item.checkInDate)}
                </p>
                <p className="flex items-center gap-1">
                  <FaCalendarAlt className="text-red-500" /> Check-Out: {formatDate(item.checkOutDate)}
                </p>
              </div>

              <div className="flex justify-between items-center mb-3">
                <p className="flex items-center gap-1 text-2xl " >
                  <FaMoneyBillAlt className="text-yellow-500 text-3xl " /> ${item.totalPrice}
                </p>
                <p className="flex items-center gap-1 text-xl">
                  <FaUsers className="text-green-500" /> Guests: {item.guests}
                </p>
              </div>

              <div className="flex justify-end">
                <span
                  className={`px-4 py-1 rounded-full text-lg ${
                    item.status === 'confirmed'
                      ? 'bg-green-200 text-green-600'
                      : item.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-600'
                        : item.status === 'cancelled'
                          ? 'bg-red-100 text-red-600'
                          : 'bg-blue-100 text-blue-600'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mybooking;
