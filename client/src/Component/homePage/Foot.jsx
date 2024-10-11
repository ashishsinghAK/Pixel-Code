import React from 'react'
import { Link } from 'react-router-dom'
import { Footer } from "flowbite-react";
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';

export const Foot = () => {
  return (
    <div className='flex flex-col border-spacing-1 rounded-md m-5 border-2 p-10 bg-stone-900'>
      {/* Main footer content */}
      <div className='text-white flex flex-col sm:flex-row justify-between items-center sm:items-start w-full sm:w-11/12 mx-auto'>
        <div className='mb-4 sm:mb-0'>Logo</div>

        <div className='flex flex-col sm:flex-row gap-10'>
          <div className='flex flex-col text-center sm:text-left text-xl'>
            <Link to="#">About</Link>
            <Link to="#">Pixel-code</Link>
            <Link to="#">Contact us</Link>
          </div>

          <div className='flex flex-col text-center sm:text-left'>
            <p className='font-bold'>Follow</p>
            <Link to="https://github.com/ashishsinghAK">Github</Link>
            <Link to="https://www.linkedin.com/in/ashish-kumar-singh-a852b426a/">Linkedin</Link>
          </div>
        </div>
      </div>

      <Footer.Divider />

      {/* Footer copyright and social icons */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center 
      sm:justify-between text-center sm:text-left mt-4 sm:mt-0 font-bold">
        <Footer.Copyright href="#" by="PIXEL-CODE " year={new Date().getFullYear()} />

        <div className="flex justify-center sm:justify-end gap-6 mt-4 sm:mt-0">
          <Footer.Icon href="#" icon={BsFacebook} />
          <Footer.Icon href='#' icon={BsInstagram} />
          <Footer.Icon href='#' icon={BsTwitter} />
          <Footer.Icon href='https://github.com/ashishsinghAK' icon={BsGithub} />
          <Footer.Icon href='#' icon={BsDribbble} />
        </div>
      </div>
    </div>
  )
}
