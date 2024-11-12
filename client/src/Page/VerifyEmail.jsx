import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OTPInput from "react-otp-input"
import { Link, useNavigate } from 'react-router-dom'
import { SendOtp, signup } from '../Service/authAPI'

const VerifyEmail = () => {
    const { loading, signupData } = useSelector((state) => state.auth)
    const [otp, setOtp] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate()
    

    useEffect(() => {
        if (!signupData) {
            navigate("/signup")
        }
    }, [signupData, navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        const {
            accountType, firstName, lastName, email, password, confirmPassword
        } = signupData

        dispatch(signup(firstName, lastName, email, password, confirmPassword, accountType, otp, navigate))
    }

    return (
        <div className="min-h-screen flex  justify-center">
            {loading ? (
                <div className="text-white">Loading...</div>
            ) : (
                <div className="w-full max-w-md p-8 space-y-6 text-center rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-white">Verify Email</h1>
                    <p className="text-lg text-slate-400">A verification email has been sent. Please enter the code.</p>

                    <form onSubmit={submitHandler} className="space-y-4">
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderInput={(props) => (
                                <input
                                    {...props}
                                    className="w-15 h-12 text-2xl text-center text-white border border-gray-600 rounded-md bg-gray-700 focus:outline-none transition"
                                />
                            )}
                            containerStyle="flex justify-center gap-5"
                        />

                        <button
                            type="submit"
                            className="w-full py-2 mt-4 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
                        >
                            Verify Email
                        </button>
                    </form>

                    <div className="flex flex-col items-center space-y-2">
                        <Link to="/login" className="text-blue-400 hover:underline">
                            Back to login
                        </Link>
                        <button
                            onClick={() => dispatch(SendOtp(signupData.email, navigate))}
                            className="text-blue-400 hover:underline"
                        >
                            Resend OTP
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default VerifyEmail
