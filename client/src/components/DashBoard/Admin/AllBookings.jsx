import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Swal from 'sweetalert2';

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { role } = useSelector((state) => state.user);

  useEffect(() => {
    fetch('http://localhost:3000/booking/all')
      .then((res) => res.json())
      .then((data) => setBookings(data.bookings));
  }, []);

  // Prepare data for booking status pie chart
  const statusCounts = bookings.reduce(
    (acc, booking) => {
      acc[booking.status] = (acc[booking.status] || 0) + 1;
      return acc;
    },
    { pending: 0, confirmed: 0, cancelled: 0 }
  );

  const chartOptions = {
    title: {
      text: 'Booking Status Overview',
    },
    chart: {
      type: 'pie',
    },
    series: [
      {
        name: 'Status',
        data: [
          { name: 'Pending', y: statusCounts.pending },
          { name: 'Confirmed', y: statusCounts.confirmed },
          { name: 'Cancelled', y: statusCounts.cancelled },
        ],
      },
    ],
  };

  // Prepare data for total revenue area chart
  const revenueData = bookings.reduce((acc, booking) => {
    const bookingDate = new Date(booking.checkInDate).toLocaleDateString();
    acc[bookingDate] = (acc[bookingDate] || 0) + booking.totalPrice;
    return acc;
  }, {});

  const revenueSeries = Object.keys(revenueData).map((date) => ({
    name: date,
    y: revenueData[date],
  }));

  const revenueChartOptions = {
    title: {
      text: 'Total Revenue Over Time',
    },
    chart: {
      type: 'area',
    },
    xAxis: {
      categories: Object.keys(revenueData), // Dates for X-axis
    },
    yAxis: {
      title: {
        text: 'Total Revenue ($)',
      },
    },
    series: [
      {
        name: 'Revenue',
        data: Object.values(revenueData), // Revenue data for Y-axis
      },
    ],
  };

  // Handle status change
  const handleStatusChange = (bookingId, newStatus) => {
    if (role !== 'SUPER_ADMIN') {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: 'warning',
        title: 'Please contact Super Admin to change role',
      });
      return;
    }

    fetch(`http://localhost:3000/booking/${bookingId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'success') {
          setBookings(data.result);
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: 'success',
            title: 'Status updated successfully',
          });
        }
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4 font-bold">All Bookings</h1>

      <div className='grid grid-cols-1 lg:grid-cols-2 '>
        {/* Booking Status Pie Chart */}
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />

        {/* Total Revenue Area Chart */}
        <HighchartsReact highcharts={Highcharts} options={revenueChartOptions} />
      </div>

      <table className="min-w-full shadow-md rounded-lg overflow-hidden mt-4">
        <thead>
          <tr className="bg-gray-500 text-left text-white uppercase text-sm">
            <th className="py-3 px-6">Image</th>
            <th className="py-3 px-6">Place Title</th>
            <th className="py-3 px-6">Guest Email</th>
            <th className="py-3 px-6">Check-In</th>
            <th className="py-3 px-6">Check-Out</th>
            <th className="py-3 px-6">Guests</th>
            <th className="py-3 px-6">Total Price</th>
            <th className="py-3 px-6">Status</th>
            {role === 'ADMIN' || role === 'SUPER_ADMIN' ? <th className="py-3 px-6">Actions</th> : null}
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id} className="border-b text-gray-200">
              <td className="py-3 px-6">
                <img src={booking.placeImg[0]} className="w-12 rounded-3xl h-12" alt="" />
              </td>
              <td className="py-3 px-6">{booking.placeTitle}</td>
              <td className="py-3 px-6">{booking.email}</td>
              <td className="py-3 px-6">{new Date(booking.checkInDate).toLocaleDateString()}</td>
              <td className="py-3 px-6">{new Date(booking.checkOutDate).toLocaleDateString()}</td>
              <td className="py-3 px-6">{booking.guests}</td>
              <td className="py-3 px-6">${booking.totalPrice}</td>
              <td className="py-3 px-6">
                <span
                  className={`px-4 py-1 rounded-full text-lg ${booking.status === 'confirmed'
                      ? 'bg-green-200 text-green-600'
                      : booking.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                >
                  {booking.status}
                </span>
              </td>
              {role === 'ADMIN' || role === 'SUPER_ADMIN' ? (
                <td className="py-3 px-6">
                  <select
                    value={booking.status}
                    onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                    className="bg-slate-500 p-2 rounded-md"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllBookings;
