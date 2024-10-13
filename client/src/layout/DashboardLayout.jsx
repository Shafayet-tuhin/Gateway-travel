import React from 'react'
import logo from '../assets/travel.png'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { logOut } from '../Redux/userSlice' 
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'

const DashboardLayout = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logOut())
        localStorage.removeItem('user')
        navigate('/login')
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Logged out successfully',
            showConfirmButton: false,
            timer: 1500
          })
    }

    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="navbar bg-base-300 w-full">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2">
                    <Link to='/'>
                    <div className='flex gap-2 items-center justify-center group'>
                        <img
                            src={logo}
                            className="w-12 transform transition-transform duration-1000 group-hover:rotate-180 group-hover:scale-110"
                            alt="Logo"
                        />
                        <span className="lg:text-5xl text-4xl cursor-pointer font-bold font-abc">Gateway</span>
                    </div>
                </Link>
                    </div>
                    <div className="hidden flex-none lg:block">
                        <ul className="menu menu-horizontal gap-2">
                            {/* Navbar menu content here */}
                            <li><Link to='' className='btn btn-outline border-gray-300 font-abc2 text-sm'>My Bookings</Link></li>
                            <li><Link to='' className='btn btn-outline border-gray-300 font-abc2 text-sm'>HomePage</Link></li>
                            <li><Link to='' className='btn btn-outline border-gray-300 font-abc2 text-sm'>Chat With AI</Link></li>
                            <li><Link to='' className='btn btn-outline btn-error border-red-300 font-abc2 text-sm' onClick={handleLogout}>Logout</Link></li>
                        </ul>
                    </div>
                </div>
                {/* Page content here */}
                <Outlet/>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <li><a>Sidebar Item 1</a></li>
                    <li><a>Sidebar Item 2</a></li>
                </ul>
            </div>
        </div>
    )
}

export default DashboardLayout