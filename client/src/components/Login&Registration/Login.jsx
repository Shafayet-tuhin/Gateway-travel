import React, { useContext, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { setUser } from '../../Redux/userSlice';
import { useDispatch } from 'react-redux';
import app from '../../Firebase/firebase.config';

const Login = () => {

    const navigate = useNavigate();
    const [see, setSee] = useState(true);
    const [pass, setPass] = useState(true);
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const provider = new GoogleAuthProvider();

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;


        fetch(`http://localhost:3000/user?email=${email}`)
            .then((res) => res.json())
            .then((data) => {

                console.log(data)

                if (data.error) {
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
                        icon: "error",
                        title: "Email not found"
                    });
                    return;
                }

                if (data.user.password === password) {
                    console.log(data.user)

                    localStorage.setItem('user', JSON.stringify(data.user));

                    dispatch(setUser(data.user));

                    navigate('/');
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
                        title: "Successfully Logged in"
                    });
                } else {
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
                        icon: "error",
                        title: "Please enter correct password"
                    });
                }
            })




    };

    const handleGoogle = () => {
        signInWithPopup(auth, provider)
            .then((data) => {
                console.log(data.user)

                if (data.user) {
                    fetch('http://localhost:3000/user', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: data.user.displayName,
                            email: data.user.email,
                            password: "Login with google",
                            image: data.user.photoURL,
                        }),
                    })
                        .then((res) => res.json())
                        .then((data) => {
                           
                                // Dispatch setUser to update Redux store
                                console.log(data.user);
                                dispatch(setUser(data.user));
                                Swal.fire({
                                    icon: 'success',
                                    title: 'successfully logged in!',
                                    toast: true,
                                    position: 'top-end',
                                    showConfirmButton: false,
                                    timer: 3000,
                                    timerProgressBar: true,
                                });
                                navigate('/');
                            
                        })

                }
            })
    };

    const handleSee = (e) => {
        e.preventDefault();
        setSee(!see);
        setPass(!pass);
    };



    return (
        <div className="lg:mt-[10%] mt-24 mb-28 font-abc2 flex justify-center">

            {/* <Helmet>
                <title>Login Page</title>
            </Helmet> */}

            <div className="hero-content flex-col lg:flex-row">
                <div className="mr-12 w-1/2">
                    <img src='https://krishnecs.in/wp-content/uploads/2023/09/login-animate-2.gif' alt="" className='rounded-3xl' />
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 ">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <h1 className="text-5xl font-bold text-center">Login</h1>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                className="input input-bordered"
                                name='email'
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="flex items-center">
                                <input
                                    type={pass ? 'password' : 'text'}
                                    placeholder="password"
                                    className="input input-bordered"
                                    name='password'
                                    required
                                />
                                <button className='btn ml-2 text-xl' onClick={handleSee}>
                                    {see ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-neutral text-xl border-none text-white">Login</button>
                        </div>

                        <div className='flex flex-col items-center mt-4 gap-4'>
                            <p className=' text-lg font-medium'>Or Login In with</p>

                            <button className='text-xl btn w-full' onClick={handleGoogle} ><FcGoogle />google</button>

                            <p className='text-base font-medium'>Don't have an account? <Link className='text-lg text-[#FF3811]' to='/registration'>Sign In</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;