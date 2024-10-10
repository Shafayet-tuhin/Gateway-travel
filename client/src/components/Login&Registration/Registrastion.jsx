import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from 'sweetalert2';
import { setUser} from '../../Redux/userSlice';
import { useDispatch} from 'react-redux';

const Registration = () => {
    const navigate = useNavigate();
    const [see, setSee] = useState(true);
    const [pass, setPass] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false); // Add loading state

    const dispatch = useDispatch();



    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setLoading(true);

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const fileInput = e.target.file.files[0];

        if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        const apiKey = import.meta.env.VITE_IMAGE_BB;

        let imageUrl = null;

        if (fileInput) {
            const formData = new FormData();
            formData.append('image', fileInput);

            try {
                const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                    method: 'POST',
                    body: formData,
                });

                const data = await res.json();

                if (data.success) {
                    imageUrl = data.data.url;

                    try {
                        const response = await fetch('http://localhost:3000/user', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                name,
                                email,
                                password,
                                image: imageUrl,
                            }),
                        });

                        const data = await response.json();

                        if (!response.ok) {
                            throw new Error(data.error || 'Something went wrong!');
                        }

                        if (data.message === 'User created successfully') {
                            // Dispatch setUser to update Redux store
                            console.log(data.user);
                            dispatch(setUser(data.user));
                            Swal.fire({
                                icon: 'success',
                                title: 'User registered successfully!', 
                                toast: true,
                                position: 'top-end',
                                showConfirmButton: false,
                                timer: 3000,
                                timerProgressBar: true,
                            });
                            navigate('/');
                        }
                    } catch (error) {
                        setErrorMessage(error.message);
                        console.error('Error:', error);
                    } finally {
                        setLoading(false);
                    }
                } else {
                    throw new Error('Image upload failed');
                }
            } catch (error) {
                setErrorMessage('Image upload failed');
                console.error('Error uploading image:', error);
                setLoading(false);
                return;
            }
        } else {
            try {
                const response = await fetch('http://localhost:3000/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                        image: imageUrl,
                    }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Something went wrong!');
                }

                if (data.message === 'User created successfully') {
                    console.log(data.user);
                    dispatch(setUser(data.user));
                    Swal.fire({
                        icon: 'success',
                        title: 'User registered successfully!',
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    });
                    navigate('/');
                }
            } catch (error) {
                setErrorMessage(error.message);
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        }
    };


    const handleSee = (e) => {
        e.preventDefault();
        setSee(!see);
        setPass(!pass);
    };

    return (
        <div className="lg:mt-[10%] mt-24 mb-28 font-abc2 flex justify-center">
            <div className="hero-content flex-col lg:flex-row">
                <div className="mr-12 w-1/2 ">
                    <img src='https://longlifevision.com/wp-content/uploads/2024/01/E9TtaYgKZu.gif' className='rounded-3xl' alt="" />
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <h1 className="text-5xl font-bold text-center">Register</h1>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Name"
                                className="input input-bordered"
                                name="name"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                className="input input-bordered"
                                name="email"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div>
                                <input
                                    type={pass ? 'password' : 'text'}
                                    placeholder="password"
                                    className="input input-bordered"
                                    name="password"
                                    required
                                />
                                <button className="btn ml-2 text-xl" onClick={handleSee}>
                                    {see ? <FaEye /> : <FaEyeSlash />}
                                </button>
                                <input type="file" className="file-input file-input-bordered w-full mt-4" name="file" />
                            </div>
                        </div>

                        {errorMessage && (
                            <div className="alert alert-error text-white shadow-lg ">
                                <div>
                                    <span>{errorMessage}</span>
                                </div>
                            </div>
                        )}

                        <div className="form-control mt-6">
                            <button className="btn btn-neutral text-white" disabled={loading}>
                                {loading ? 'Submitting...' : 'Sign In'}
                            </button>
                        </div>

                        <div className="flex flex-col items-center mt-4 gap-4">
                            <p className=" text-base font-medium">
                                Dont have an account?{" "}
                                <Link className=" text-lg text-[#FF3811]" to="/login">
                                    LogIn
                                </Link>{" "}
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registration;
