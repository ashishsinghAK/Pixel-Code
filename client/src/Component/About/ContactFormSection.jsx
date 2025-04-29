import React from 'react'
import ContactUsForm from '../Common/ContactUsForm'

function ContactFormSection() {
    return (
        <div className="w-full bg-slate-900 text-white py-6 px-4 sm:px-6 md:px-10 lg:px-10">
            <div className="max-w-5xl mx-auto flex flex-col items-center gap-4 text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
                    Get in Touch
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-orange-500 font-medium">
                    We love to hear from you, please fill out this form
                </p>
            </div>

            <div>
                <ContactUsForm />
            </div>
        </div>
    )
}

export default ContactFormSection;
