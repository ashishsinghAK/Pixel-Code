import React from 'react'
import ContactUsForm from '../Common/ContactUsForm'

function ContactFormSection() {
    return (
        <div className='flex flex-col mx-auto items-center gap-5'>
            <h1 className='text-4xl font-bold'>Get in touch</h1>
            <p className='text-2xl text-orange-500 font-semibold'>We love to here from you, please fill out this form</p>
            <ContactUsForm />
        </div>
    )
}

export default ContactFormSection