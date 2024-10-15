import React, { useEffect, useState } from 'react';
import logo from '../../../assets/travel.png';
import { useDispatch, useSelector } from 'react-redux';
import { ImProfile } from "react-icons/im";
import { logOut } from '../../../Redux/userSlice';
import { Link } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { SiGooglegemini } from "react-icons/si";
import Swal from 'sweetalert2';
import { FaHome } from "react-icons/fa";

const Nav = () => {
    const { id, username, email, profilePicture, role } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // Set initial theme state based on localStorage, default to 'dark'
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.querySelector("html").setAttribute("data-theme", theme);
    }, [theme]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        dispatch(logOut());

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
    };

    const handleTheme = (e) => {
        setTheme(e.target.checked ? "light" : "dark");
    }

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link to='/'>
                    <div className='flex gap-2 items-center justify-center group '>
                        <img
                            src={logo}
                            className="w-12 transform transition-transform duration-1000 group-hover:rotate-180 group-hover:scale-110"
                            alt="Logo"
                        />
                        <span className="lg:text-5xl text-4xl cursor-pointer font-bold font-abc text-base-content">Gateway</span>
                    </div>
                </Link>
            </div>

            <label className="lg:mr-4 mr-2 flex cursor-pointer gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>

                <input
                    type="checkbox"
                    className="toggle theme-controller"
                    onChange={handleTheme}
                    checked={theme === "light"} // Set the checked attribute based on the current theme
                />

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <path
                        d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>
            </label>

            {!email ? (
                <Link to='/login'>
                    <button className='font-abc2 text-xl px-6 py-3 bg-slate-800 text-white rounded-xl shadow-xl shadow-cyan-700 hover:shadow-orange-400'>Login</button>
                </Link>
            ) : (
                <div className="flex-none">
                    <div className="dropdown dropdown-end border-2 rounded-full border-cyan-300 bg-gradient-to-l from-gray-700 to-slate-500 shadow-2xl shadow-cyan-500">
                        <div tabIndex={0} role="button">
                            <div className='flex items-center gap-4 p-1'>
                                <img className='w-12 h-12 rounded-3xl object-cover border-2 p-1 border-blue-300' src={profilePicture} alt="Profile" />
                                <h1 className='font-abc text-white text-xl mr-4'>{username}</h1>
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-gradient-to-l from-gray-700 to-slate-500 rounded-box text-white z-[1] mt-3 w-52 p-2 shadow-2xl shadow-cyan-500 font-abc2"
                        >
                            {role === "GUEST" ? (
                                <>
                                    <li><Link to='/'><FaHome /> Home </Link></li>
                                    <li><Link to='/dashboard/home'><ImProfile /> Profile</Link></li>
                                    <li><Link to='/dashboard/booking'><MdDashboard /> Bookings</Link></li>
                                    <li><Link to='/dashboard/allplaces'><MdDashboard /> All Places</Link></li>
                                    <li><Link to='/chat'><SiGooglegemini /> Chat with AI</Link></li>

                                    <li className='btn btn-sm btn-outline btn-error text-base' onClick={handleLogout}>Logout</li>
                                </>
                            ) : (
                                <>
                                    <li><Link to='/'><FaHome /> Home </Link></li>
                                    <li><Link to='/dashboard/home'><ImProfile /> Profile</Link></li>
                                    <li><Link to='/dashboard/alluser'><MdDashboard /> All User</Link></li>
                                    <li><Link to='/dashboard/allbooking'><MdDashboard /> All Bookings</Link></li>
                                    <li><Link to='/dashboard/allplaces'><MdDashboard /> All Places</Link></li>
                                    <li><Link to='/chat'><SiGooglegemini /> Chat with AI</Link></li>

                                    <li className='btn btn-sm btn-outline btn-error text-base' onClick={handleLogout}>Logout</li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Nav;
