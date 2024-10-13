import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { addBooking,clearBookings } from '../../../Redux/bookingSlice'

const Success = () => {

    const dispatch = useDispatch()

    const data = useSelector((state) => state.booking.currentBooking)

    console.log(data)

    useEffect(() => {

        const bookingData = {
            email: data.email,
            placeImg: data.placeImg,
            placeTitle: data.placeTitle,
            checkInDate : data.checkInDate,
            checkOutDate : data.checkOutDate,
            guests: data.guests,
            totalPrice: data.totalPrice,
          };


        fetch('http://localhost:3000/booking',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            localStorage.removeItem('bookingData')
            dispatch(clearBookings())
        })
    },[dispatch])

    return (
        <div class="mt-[40%] md:mt-16 font-abc">
            <h1 class="text-5xl text-center font-semibold">Payment Success</h1>
            <img className='w-full md:w-[50%] mx-auto' src="https://i.ibb.co.com/bKw1HFb/Icon-animation-for-Prio-app.gif" alt="" />
            {/* <img className='w-full md:w-[50%] mx-auto' src="https://cdn.dribbble.com/users/1280935/screenshots/6974685/media/ec4c386222b837da0ff6eabec3f59ba3.gif" alt="" /> */}
            <Link className='mt-8 btn btn-success text-white w-[50%] md:w-[30%] flex mx-auto font-abc2 '>View Bookings</Link>              
        </div>
    )
}

export default Success