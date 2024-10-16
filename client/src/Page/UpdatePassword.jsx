import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Link } from "react-router-dom"
import { IoIosEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import {PasswordReset} from "../Service/authAPI"

const UpdatePassword = () => {
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })
    const dispatch = useDispatch();
    const location = useLocation()
    const { loading } = useSelector((state) => state.auth)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const { password, confirmPassword } = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name]: e.target.value,
            }
        ))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(PasswordReset(password, confirmPassword, token))
    }

    return (
        <div className='w-full h-full px-4 py-10 flex justify-center items-center text-white'>
            {
                loading ? (<div>Loading...</div>) : (
                    <div className='flex flex-col justify-center gap-5 w-full max-w-md md:max-w-lg lg:max-w-xl'>
                        <h1 className='text-2xl md:text-3xl lg:text-4xl font-semibold text-center'>Choose New Password</h1>
                        <p className='text-base md:text-lg lg:text-xl text-slate-400 text-center'>Almost done. Enter your new password</p>
                        <form onSubmit={submitHandler} className='space-y-5'>
                            <div className='flex flex-col relative'>
                                <label htmlFor="pass" className="text-sm md:text-base">New Password</label>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    required 
                                    id="pass"
                                    name="password"
                                    value={password}
                                    onChange={handleOnChange} 
                                    className='bg-slate-800 h-10 md:h-12 rounded-md px-4 text-white' 
                                />
                                <span 
                                    onClick={() => setShowPassword(prev => !prev)} 
                                    className="absolute right-4 top-[65%] transform -translate-y-1/2 cursor-pointer text-gray-400"
                                >
                                    {showPassword ? <IoMdEye fontSize={24} /> : <IoIosEyeOff fontSize={24} />}
                                </span>
                            </div>

                            <div className='flex flex-col relative'>
                                <label htmlFor="confirmpass" className="text-sm md:text-base">Confirm Password</label>
                                <input 
                                    type={showConfirmPassword ? "text" : "password"} 
                                    required 
                                    id="confirmpass"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={handleOnChange} 
                                    className='bg-slate-800 h-10 md:h-12 rounded-md px-4 text-white' 
                                />
                                <span 
                                    onClick={() => setShowConfirmPassword(prev => !prev)} 
                                    className="absolute right-4 top-[65%] transform -translate-y-1/2 cursor-pointer text-gray-400"
                                >
                                    {showConfirmPassword ? <IoMdEye fontSize={24} /> : <IoIosEyeOff fontSize={24} />}
                                </span>
                            </div>

                            <button 
                                type='submit' 
                                className='bg-blue-600 hover:bg-blue-700 text-white py-2 md:py-3 rounded-md w-full'
                            >
                                Reset Password
                            </button>
                        </form>
                        <div className="text-center">
                            <Link to="/login" className="text-blue-400 hover:text-blue-500">Back to login</Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default UpdatePassword
