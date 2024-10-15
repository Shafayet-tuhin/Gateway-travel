import React, { useEffect, useState } from 'react'
import logo from '../assets/travel.png'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { logOut } from '../Redux/userSlice'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'

const DashboardLayout = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { role } = useSelector(state => state.user)

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.querySelector("html").setAttribute("data-theme", theme);
    }, [theme]);

    const handleLogout = () => {
        dispatch(logOut())
        localStorage.removeItem('user')
        navigate('/login')

        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: "logged out successfully"
        });
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
                            {
                                role === "GUEST" ?
                                    <>
                                        <li><Link to='/dashboard/home' className='btn btn-outline border-gray-300 font-abc2 text-sm'>My Profile</Link></li>
                                        <li><Link to='/dashboard/booking' className='btn btn-outline border-gray-300 font-abc2 text-sm'>My Bookings</Link></li>
                                        <li><Link to='/dashboard/allplaces' className='btn btn-outline border-gray-300 font-abc2 text-sm'>All Places</Link></li>
                                        <li><Link to='/' className='btn btn-outline border-gray-300 font-abc2 text-sm'>HomePage</Link></li>
                                        <li><Link to='/chat' className='btn btn-outline border-gray-300 font-abc2 text-sm'>Chat With AI</Link></li>
                                        <li className='btn btn-outline btn-error border-red-300 font-abc2 text-sm' onClick={handleLogout}>Logout</li>
                                    </>
                                    :
                                    <>
                                        <li><Link to='/dashboard/home' className='btn btn-outline border-gray-300 font-abc2 text-sm'>Profile</Link></li>
                                        <li><Link to='/dashboard/alluser' className='btn btn-outline border-gray-300 font-abc2 text-sm'>All Users</Link></li>
                                        <li><Link to='/dashboard/allbooking' className='btn btn-outline border-gray-300 font-abc2 text-sm'>All Bookings</Link></li>
                                        <li><Link to='/dashboard/allplaces' className='btn btn-outline border-gray-300 font-abc2 text-sm'>All Places</Link></li>
                                        <li><Link to='/' className='btn btn-outline border-gray-300 font-abc2 text-sm'>HomePage</Link></li>
                                        <li className='btn btn-outline btn-error border-red-300 font-abc2 text-sm' onClick={handleLogout}>Logout</li>
                                    </>
                            }
                        </ul>
                    </div>
                </div>
                {/* Page content here */}
                <Outlet />
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4">
                    {
                        role === "GUEST" ?
                            <>
                                <li><Link to='/dashboard/home' className='btn btn-outline border-gray-300 font-abc2 text-sm'>My Profile</Link></li>
                                <li><Link to='/dashboard/booking' className='btn btn-outline border-gray-300 font-abc2 text-sm'>My Bookings</Link></li>
                                <li><Link to='/dashboard/allplaces' className='btn btn-outline border-gray-300 font-abc2 text-sm'>All Places</Link></li>
                                <li><Link to='/' className='btn btn-outline border-gray-300 font-abc2 text-sm'>HomePage</Link></li>
                                <li><Link to='/chat' className='btn btn-outline border-gray-300 font-abc2 text-sm'>Chat With AI</Link></li>
                                <li className='btn btn-outline btn-error border-red-300 font-abc2 text-sm' onClick={handleLogout}>Logout</li>
                            </>
                            :
                            <>
                                <li><Link to='/dashboard/home' className='btn btn-outline border-gray-300 font-abc2 text-sm'>Profile</Link></li>
                                <li><Link to='/dashboard/alluser' className='btn btn-outline border-gray-300 font-abc2 text-sm'>All Users</Link></li>
                                <li><Link to='/dashboard/allbooking' className='btn btn-outline border-gray-300 font-abc2 text-sm'>All Bookings</Link></li>
                                <li><Link to='/dashboard/allplaces' className='btn btn-outline border-gray-300 font-abc2 text-sm'>All Places</Link></li>
                                <li><Link to='/' className='btn btn-outline border-gray-300 font-abc2 text-sm'>HomePage</Link></li>
                                <li className='btn btn-outline btn-error border-red-300 font-abc2 text-sm' onClick={handleLogout}>Logout</li>
                            </>
                    }
                </ul>
            </div>
        </div>
    )
}

export default DashboardLayout