import React, { useState } from 'react'
import TextHighlight from '../Component/homePage/TextHighlight';
import { SendOtp } from "../Service/authAPI"
import "../App.css"
import signupImage from "../Media/signupImage.jpg"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSignUpData } from '../Reducer/slice/authSlice';

const SignUp = () => {
    const signupData = useSelector((state) => state.auth.signupData) || {};
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        accountType = "Student",
        firstName = "",
        lastName = "",
        email = "",
        password = "",
        confirmPassword = ""
    } = signupData;

    

    const handleAccount = (type) => {
        dispatch(setSignUpData({...signupData,accountType:type}))
    }
    
    const changeHandler = (event) => {
      dispatch(setSignUpData({...signupData,[event.target.id]:event.target.value}))  
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return alert("All fields are mandatory");
        }
        try{
            dispatch(SendOtp(email,navigate))
        }catch(error){
            console.log("Otp Sending Fail")
        }
    }
    return (
        <div className='text-white flex flex-col lg:flex-row gap-10 justify-center items-center p-5 lg:p-10'>


            {/* Left section */}
            <div className='flex flex-col w-full lg:w-[45%] justify-center gap-5 mb-10 lg:mb-0'>
                <h1 className='text-2xl lg:text-4xl'>Join a vibrant community of learners—master coding skills,
                    solve problems, <TextHighlight text={"and build your future today!"} /></h1>
                <h2 className='text-lg lg:text-xl text-slate-300'>Build skills for today, tomorrow, and beyond!</h2>

                <form onSubmit={submitHandler}>
                    <p className='text-red-600'>Please Specify your accountType</p>
                    <div className='flex flex-row  border-2 rounded-md w-fit'>
                        <button onClick={() => handleAccount("Student")}
                            className={`px-4 py-2 ${accountType == "Student" ? "bg-slate-700" : "bg-slate-950"} text-white hover:bg-gray-600 transition-colors rounded-l-md `}>
                            Student</button>
                        <button onClick={() => handleAccount("Instructor")}
                            className={`px-2 py-4 ${accountType == "Instructor" ? "bg-slate-700" : "bg-slate-950"} text-white hover:bg-gray-600 transition-colors rounded-l-md`}>
                            Instructor</button>
                    </div>

                    <div className='flex flex-col md:flex-row gap-5'>
                        <div className='flex flex-col w-full md:w-1/2'>
                            <label htmlFor="firstName">First Name <span className="text-red-500">*</span></label>
                            <input type="text" id="firstName" className='btn bg-slate-800 p-2 rounded-md' placeholder='Enter First Name' required onChange={changeHandler}/>
                        </div>
                        <div className='flex flex-col w-full md:w-1/2'>
                            <label htmlFor="lastName">Last Name <span className="text-red-500">*</span></label>
                            <input type="text" id="lastName" className='btn bg-slate-800 p-2 rounded-md' placeholder='Enter Last Name' required onChange={changeHandler}/>
                        </div>
                    </div>

                    <div className='flex flex-col w-full'>
                        <label htmlFor="email">Email <span className="text-red-500">*</span></label>
                        <input type="email" id="email" className='btn bg-slate-800 p-2 rounded-md' placeholder='Enter Email Address' required onChange={changeHandler}/>
                    </div>

                    <div className='flex flex-col md:flex-row gap-5'>
                        <div className='flex flex-col w-full md:w-1/2'>
                            <label htmlFor="password">Create Password <span className="text-red-500">*</span></label>
                            <input type="password" id="password" className='btn bg-slate-800 p-2 rounded-md' placeholder='Create Password' required onChange={changeHandler}/>
                        </div>
                        <div className='flex flex-col w-full md:w-1/2'>
                            <label htmlFor="confirmPassword">Confirm Password <span className="text-red-500">*</span></label>
                            <input type="password" id="confirmPassword" className='btn bg-slate-800 p-2 rounded-md' placeholder='Confirm Password' required onChange={changeHandler}/>
                        </div>
                    </div>
                    <div className='mt-5'>
                    <button type='submit' className='bg-yellow-500 w-fit p-2 text-black font-bold rounded-md'>
                        Create Account
                    </button>
                   </div>
                </form>
            </div>

            {/* Right Section */}
            <div className='w-full lg:w-[45%]'>
                <img src={signupImage} className='w-full lg:w-[40vw] rounded-md' />
            </div>
        </div>
    )
}

export default SignUp
