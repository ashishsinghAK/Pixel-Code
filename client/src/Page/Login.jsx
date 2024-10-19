import React, { useState } from 'react';
import CTAButton from "../Component/homePage/Button";
import loginImage from "../Media/loginImage.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {login} from "../Service/authAPI"

const Login = () => {
    const {loading} = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [formData,setFormData] = useState({
        email:"",
        password:""
    })

    const handleChange = (event) => {
        setFormData({...formData,[event.target.id]:event.target.value})
    }
    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(login(formData.email,formData.password,navigate))
        
    }
    return (
        <div className='text-white flex flex-col lg:flex-row justify-center gap-10 items-center p-5'>
            {/* Left Section */}
            <div className='flex flex-col gap-5 '>
                <div>
                    <h1 className='text-2xl lg:text-4xl'>Welcome Back</h1>
                    <h2 className='text-lg lg:text-xl text-slate-300'>Build skills for today, tomorrow, and beyond!</h2>
                </div>

                <form onSubmit={submitHandler}>
                    {/* <div className='flex flex-row border-2 rounded-lg w-full lg:w-fit'>
                        <button onClick={() => handleAccount("Student")}
                            className={`px-4 py-2 ${accountType == "Student" ? "bg-slate-700" : "bg-slate-950"} text-white hover:bg-gray-600 transition-colors rounded-l-md `}>
                            Student</button>
                        <button onClick={() => handleAccount("Instructor")}
                            className={`px-4 py-2 ${accountType == "Instructor" ? "bg-slate-700" : "bg-slate-950"} text-white hover:bg-gray-600 transition-colors rounded-l-md `}>
                            Instructor</button>
                    </div> */}

                    <div className='flex flex-col'>
                        <label htmlFor="email">Email <span className="text-red-500">*</span></label>
                        <input type="email" id="email" className='btn bg-slate-800 p-2 rounded-md' onChange={handleChange} placeholder='Enter Email Address' required />
                    </div>

                    <div className='flex flex-col '>
                        <label htmlFor="password">Password <span className="text-red-500">*</span></label>
                        <input type="password" id="password" className='btn bg-slate-800 p-2 rounded-md' onChange={handleChange} placeholder='Password' required />
                    </div>

                    <div className='mt-5'>
                        <button type='submit' className='bg-yellow-500 w-fit p-2 text-black font-bold rounded-md'>
                            Login
                        </button>
                    </div>
                </form>
            </div>

            {/* Right Section */}
            <div className='w-full lg:w-1/2 mt-5 lg:mt-0'>
                <img src={loginImage} alt="Login Visual" className='w-full h-auto object-cover' />
            </div>
        </div>
    );
}

export default Login;
