import React from 'react';
import logo from '../../../assets/travel.png';
import login from '../../../assets/login.png';
import { useDispatch, useSelector } from 'react-redux';

import { logOut } from '../../../Redux/userSlice';
import { Link } from 'react-router-dom';

const Nav = () => {

    const { id, username, email, profilePicture } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    console.log(id, username, email, profilePicture)

    const handleLogout = () => {
        localStorage.removeItem('user');
        dispatch(logOut());
    }


    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <div className='flex gap-2 items-center justify-center group'>
                    <img
                        src={logo}
                        className="w-12 transform transition-transform duration-1000 group-hover:rotate-180 group-hover:scale-110"
                        alt="Logo"
                    />
                    <a className="lg:text-5xl  text-4xl cursor-pointer font-bold font-abc ">Gateway</a>
                </div>

            </div>
 
            {
                email === null ? <Link to='/login' className='w-16 hover:animate-bounce animate-pulse'><img src={login} alt="" /></Link>
                    : <div className="flex-none">

                        <div className="dropdown dropdown-end border-2 rounded-full border-cyan-300 bg-slate-700 shadow-2xl">
                            <div tabIndex={0} role="button" >
                                <div className='flex items-center gap-4 p-1'> 
                                    <img className='w-12 h-12 rounded-3xl object-cover border-2 p-1 border-blue-300' src={profilePicture} alt="" />
                                    <h1 className='font-abc text-white  text-xl mr-4'>{username}</h1>
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-slate-700 rounded-box text-white z-[1] mt-3 w-52 p-2 shadow font-abc2">
                            
                                <li><Link to='' >Profile</Link></li>
                                <li><Link to='' >Dashboard</Link></li>
                                <li><Link to='' >Chat with AI</Link></li>
                                <li className='btn btn-sm btn-outline btn-error text-base' onClick={handleLogout}>Logout</li>
                            </ul>
                        </div>
                    </div>
            }

        </div>
    );
};

export default Nav;
