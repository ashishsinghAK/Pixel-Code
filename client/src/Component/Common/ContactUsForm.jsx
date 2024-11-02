import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { ApiConnector } from "../../Service/ApiConnector"
import { contactUsData } from "../../Service/API"

function ContactUsForm() {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm();

    const submitContactForm = async (data) => {
        console.log('logging data', data);
        try {
            setLoading(true);
            const response = await ApiConnector("POST", contactUsData.CONTACT_US_API, data);
            console.log('response', response);
            setLoading(false)
        } catch (error) {
            console.log(error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
            })
        }
    }, [reset, isSubmitSuccessful])

    return (
        <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
            <form onSubmit={handleSubmit(submitContactForm)} className="flex flex-col gap-5 m-10">
                <div className="flex gap-5">
                    {/* First Name */}
                    <div className="flex flex-col items-start gap-2 w-1/2">
                        <label htmlFor="firstname">First Name:</label>
                        <input type="text" id="firstname" name="firstname" placeholder="Enter First Name"
                            {...register("firstname", { required: true })} 
                            className="w-full bg-slate-700 h-[2em] rounded-md" />
                        {errors.firstname && (
                            <span className="text-red-500 text-sm">Please enter First Name</span>
                        )}
                    </div>

                    {/* Last Name */}
                    <div className="flex flex-col items-start gap-2 w-1/2">
                        <label htmlFor="lastname">Last Name:</label>
                        <input type="text" id="lastname" name="lastname" placeholder="Enter Last Name"
                            {...register("lastname")} 
                            className="w-full bg-slate-700 h-[2em] rounded-md" />
                    </div>
                </div>

                {/* Email */}
                <div className="flex flex-col items-start gap-2">
                    <label htmlFor="email">Email:</label>
                    <input type="email" placeholder="Enter Email" id="email" name="email"
                        {...register("email", { required: true })} 
                        className="w-full bg-slate-700 h-[2em] rounded-md" />
                    {errors.email && (
                        <span className="text-red-500 text-sm">Enter Email Address</span>
                    )}
                </div>

                {/* Message */}
                <div className="flex flex-col items-start gap-2">
                    <label htmlFor="message">Message:</label>
                    <textarea name="message" id="message" cols="30" rows="7" placeholder="Enter your message"
                        {...register("message", { required: true })} 
                        className="w-full bg-slate-700 rounded-md" />
                    {errors.message && (
                        <span className="text-red-500 text-sm">Enter the Message</span>
                    )}
                </div>

                {/* Button */}
                <button type="submit" className="rounded-md bg-yellow-500 text-black font-bold h-[2em] px-4 w-full sm:w-auto">
                    {loading ? "Sending..." : "Send Message"}
                </button>
            </form>
        </div>
    )
}

export default ContactUsForm;
