import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { getPasswordResetToken } from '../Service/authAPI'

const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("")
    const { loading } = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('submit handler called');
        dispatch(getPasswordResetToken(email, setEmailSent));
    }

    return (
        <div className='w-full h-full m-10 flex flex-row justify-center text-white items-center gap-5'>

            {
                loading ? (<div>Loading...</div>) : (<div className='flex flex-col h-[50vh] gap-5'>
                    <h1 className='text-4xl font-semibold'>{!emailSent ? "Reset your Password" : "Check your Email"}</h1>
                    <p className='text-large text-slate-500'>{!emailSent ? "Have no fear. we'll email you instructions to reset your password."
                        : `We have sent the link of reset email to ${email}`}</p>
                    <form onSubmit={submitHandler} className='flex flex-col gap-5'>
                        {!emailSent && (<div className='flex flex-col gap-5'>
                            <label htmlFor="email" className='text-xl font-semibold'>Email Address:</label>
                            <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                                placeholder='Enter Email' className='bg-slate-800 h-10 rounded-md' />
                        </div>)}

                        <button type="submit">
                            {!emailSent ? "Reset Password" : "Resend Email"}
                        </button>
                    </form>

                    <div><Link to="/login">Back to login</Link></div>
                </div>)
            }

        </div>
    )
}

export default ForgotPassword