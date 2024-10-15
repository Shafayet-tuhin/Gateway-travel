import React from 'react';
import logo from '../../../assets/travel.png';
import login from '../../../assets/login.png';
import { useDispatch, useSelector } from 'react-redux';
import { ImProfile } from "react-icons/im";
import { logOut } from '../../../Redux/userSlice';
import { Link } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { SiGooglegemini } from "react-icons/si";

const Nav = () => {
    const { id, username, email, profilePicture, role } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    console.log(role)

    const handleLogout = () => {
        localStorage.removeItem('user');
        dispatch(logOut());
    };

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
                        <span className="lg:text-5xl text-4xl cursor-pointer font-bold font-abc text-white">Gateway</span>
                    </div>
                </Link>
            </div>

            {
                !email ? (
                    <Link to='/login'>
                       <button className='font-abc2 text-xl px-6 py-3 bg-slate-800 rounded-xl shadow-xl shadow-cyan-700 hover:shadow-orange-400' >Login</button>
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
                                {
                                    role === "GUEST" ?
                                        <>
                                            <li><Link to='/dashboard/home'><ImProfile /> Profile</Link></li>
                                            <li><Link to='/dashboard/booking'><MdDashboard /> Bookings</Link></li>
                                            <li><Link to='/chat'><SiGooglegemini /> Chat with AI</Link></li>
                                            <li className='btn btn-sm btn-outline btn-error text-base' onClick={handleLogout}>Logout</li>
                                        </>
                                        :
                                        <> <li><Link to='/dashboard/home'><ImProfile /> Profile</Link></li>
                                            <li><Link to='/chat'><SiGooglegemini /> Chat with AI</Link></li>
                                            <li><Link to='/dashboard/alluser'><SiGooglegemini /> All User</Link></li>
                                            <li><Link to='/dashboard/allbooking'><SiGooglegemini /> All Bookings</Link></li>
                                            <li className='btn btn-sm btn-outline btn-error text-base' onClick={handleLogout}>Logout</li>
                                        </>
                                }
                            </ul>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Nav;
