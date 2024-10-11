import React from 'react';
import CTAButton from "../Component/homePage/Button";
import login from "../Media/login.jpg";

const Login = () => {
    return (
        <div className='text-white flex flex-col lg:flex-row justify-center gap-10 items-center p-5'>
            {/* Left Section */}
            <div className='flex flex-col gap-5 '>
                <div>
                    <h1 className='text-2xl lg:text-4xl'>Welcome Back</h1>
                    <h2 className='text-lg lg:text-xl text-slate-300'>Build skills for today, tomorrow, and beyond!</h2>
                </div>

                <div className='flex flex-row border-2 w-full lg:w-fit'>
                    <button className='px-4 py-2 bg-gray-700 text-white hover:bg-gray-600 w-full lg:w-auto'>Student</button>
                    <button className='px-4 py-2 bg-gray-700 text-white hover:bg-gray-600 w-full lg:w-auto'>Instructor</button>
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="email">Email <span className="text-red-500">*</span></label>
                    <input type="email" id="email" className='btn bg-slate-800 p-2 rounded-md' placeholder='Enter Email Address' required />
                </div>

                <div className='flex flex-col '>
                    <label htmlFor="pass">Password <span className="text-red-500">*</span></label>
                    <input type="password" id="pass" className='btn bg-slate-800 p-2 rounded-md' placeholder='Password' required />
                </div>

                <div className='mt-5'>
                    <CTAButton active={true} children={"Login"} linkto={"/"} />
                </div>
            </div>

            {/* Right Section */}
            <div className='w-full lg:w-1/2 mt-5 lg:mt-0'>
                <img src={login} alt="Login Visual" className='w-full h-auto object-cover' />
            </div>
        </div>
    );
}

export default Login;
