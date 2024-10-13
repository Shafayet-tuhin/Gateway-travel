import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {clearBookings} from '../../../Redux/bookingSlice'
const Cancel = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearBookings())
        localStorage.removeItem('bookingData')
    },[dispatch])

  return (
    <div class="mt-[40%] md:mt-16 font-abc">
    <h1 class="text-5xl text-red-400 mb-16 text-center font-semibold">Ooops....Something Went Wrong.</h1>
    {/* <img className='w-full md:w-[50%] mx-auto' src="https://cdn.dribbble.com/users/614270/screenshots/14575431/media/4907a0869e9ed2ac4e2d1c2beaf9f012.gif" alt="" /> */}
    <img className='w-full md:w-[35%] mx-auto' src="https://i.ibb.co.com/vZZ0TKx/image-processing20210907-3665-x8l1c3.gif" alt="" />
    <Link to='/' className='mt-8 btn btn-error text-white w-[50%] md:w-[30%] flex mx-auto font-abc2 '>Go Back</Link>              
</div>
  )
}

export default Cancel