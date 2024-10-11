import React from 'react'
import Instructor from "../../Media/Instructor.jpg"
import TextHighlight from './TextHighlight'
import CTAButton from "./Button"
import { FaArrowRightToBracket } from "react-icons/fa6";

const InstructorSection = () => {
  return (
    <div className='m-5 md:m-11'>
      <div className='flex flex-col lg:flex-row justify-between items-center lg:items-stretch'>
        {/* Instructor Image */}
        <div className='w-full lg:w-[45%] mb-6 lg:mb-0'>
          <img src={Instructor} alt="Instructor" className='w-full h-auto object-cover rounded-lg' />
        </div>

        {/* Instructor Information */}
        <div className='flex flex-col justify-evenly w-full lg:w-[45%] text-center lg:text-left'>
          <p className='text-3xl sm:text-4xl font-semibold text-white'>
            Become an <TextHighlight text={" Instructor"} />
          </p>
          <p className='text-lg sm:text-xl text-slate-400 mt-4'>
            Instructors from around the world teach millions of students on PIXEL-CODE. We provide the tools and skills to teach what you love.
          </p>
          <div className='mt-6 w-fit mx-auto lg:mx-0'>
            <CTAButton active={true} linkto={"/signup"}>
              <div className='flex flex-row gap-2 items-center'>
                Start Teaching Today
                <FaArrowRightToBracket />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstructorSection;
