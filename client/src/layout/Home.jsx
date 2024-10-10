import React from 'react'
import Nav from '../components/Homepage/Navbar/Nav'
import Places from '../components/Homepage/Places/Places'
import Footer from '../components/Homepage/Footer/Footer'

const Home = () => {
    return (
        <div className='container mx-auto mt-6'>
            <Nav />
            <Places />
            <Footer/>
        </div>
    )
}

export default Home