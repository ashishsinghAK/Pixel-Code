import React from 'react'
import CTAButton from "../Component/homePage/Button";
import TextHighlight from '../Component/homePage/TextHighlight';
import signup from "../Media/signup.jpg"
import "../App.css"

const SignUp = () => {
    return (
        <div className='text-white flex flex-col lg:flex-row gap-10 justify-center items-center p-5 lg:p-10'>


            {/* Left section */}
            <div className='flex flex-col w-full lg:w-[45%] justify-center gap-5 mb-10 lg:mb-0'>
                <h1 className='text-2xl lg:text-4xl'>Join a vibrant community of learners—master coding skills,
                    solve problems, <TextHighlight text={"and build your future today!"} /></h1>
                <h2 className='text-lg lg:text-xl text-slate-300'>Build skills for today, tomorrow, and beyond!</h2>

                <div className='flex flex-row border-2 w-fit'>
                    <button className='px-4 py-2 bg-gray-700 text-white hover:bg-gray-600'>Student</button>
                    <button className='px-4 py-2 bg-gray-700 text-white hover:bg-gray-600'>Instructor</button>
                </div>

                <div className='flex flex-col md:flex-row gap-5'>
                    <div className='flex flex-col w-full md:w-1/2'>
                        <label htmlFor="first">First Name <span className="text-red-500">*</span></label>
                        <input type="text" id="first" className='btn bg-slate-800 p-2 rounded-md' placeholder='Enter First Name' required />
                    </div>
                    <div className='flex flex-col w-full md:w-1/2'>
                        <label htmlFor="last">Last Name <span className="text-red-500">*</span></label>
                        <input type="text" id="last" className='btn bg-slate-800 p-2 rounded-md' placeholder='Enter Last Name' required />
                    </div>
                </div>

                <div className='flex flex-col w-full'>
                    <label htmlFor="email">Email <span className="text-red-500">*</span></label>
                    <input type="email" id="email" className='btn bg-slate-800 p-2 rounded-md' placeholder='Enter Email Address' required />
                </div>

                <div className='flex flex-col md:flex-row gap-5'>
                    <div className='flex flex-col w-full md:w-1/2'>
                        <label htmlFor="create">Create Password <span className="text-red-500">*</span></label>
                        <input type="password" id="create" className='btn bg-slate-800 p-2 rounded-md' placeholder='Create Password' required />
                    </div>
                    <div className='flex flex-col w-full md:w-1/2'>
                        <label htmlFor="confirm">Confirm Password <span className="text-red-500">*</span></label>
                        <input type="password" id="confirm" className='btn bg-slate-800 p-2 rounded-md' placeholder='Confirm Password' required />
                    </div>
                </div>

                <div className='mt-5'>
                    <CTAButton active={true} children={"Create Account"} linkto={"/"} />
                </div>
            </div>

            {/* Right Section */}
            <div className='w-full lg:w-[45%]'>
                <img src={signup} alt="Signup" className='w-full lg:w-[40vw] rounded-md' />
            </div>
        </div>
    )
}

export default SignUp
