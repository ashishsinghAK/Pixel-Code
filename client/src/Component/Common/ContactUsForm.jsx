import React, { useRef } from 'react'
import emailjs from "@emailjs/browser"
import toast from 'react-hot-toast';

function ContactUsForm() {
  const service = import.meta.env.VITE_SERVICE_KEY;
  const template = import.meta.env.VITE_TEMPLATE_KEY;
  const publickey = import.meta.env.VITE_PUBLIC_KEY;

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(service, template, form.current, publickey)
      .then((result) => {
        console.log(result.text);
        e.target.reset();
        toast.success("Email sent !");
      }, (error) => {
        console.log(error.text);
      });
  };

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-32 py-6 text-white flex justify-center items-center min-h-screen">
      <div className="w-full max-w-3xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-yellow-400 mb-8">
          Contact Us
        </h2>

        <form
          ref={form}
          onSubmit={sendEmail}
          className="flex flex-col gap-6 bg-gray-900 border border-slate-600 rounded-2xl p-6 sm:p-10 shadow-2xl transition-all"
        >
          <input
            type="text"
            placeholder="Your Name"
            name="your_name"
            required
            className="p-4 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-300"
          />

          <input
            type="email"
            placeholder="Enter your Email"
            name="your_email"
            required
            className="p-4 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-300"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            required
            className="p-4 rounded-lg bg-slate-700 border border-slate-600 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-300"
          ></textarea>

          <button
            type="submit"
            className="w-full sm:w-fit px-6 py-3 rounded-lg bg-yellow-400 text-slate-900 font-semibold hover:bg-yellow-500 transition-all duration-200 self-center"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactUsForm;
