import React from 'react'
import Logo1 from "../../Media/Logo1.jpg"
import Logo2 from "../../Media/Logo2.jpg"
import Logo3 from "../../Media/Logo3.jpg"
import Logo4 from "../../Media/Logo4.jpg"
import background from "../../Media/background.jpg"

const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        subheading: "Fully committed to the success company"
    },
    {
        Logo: Logo2,
        heading: "Responsibility",
        subheading: "Students will always be our top priority"
    },
    {
        Logo: Logo3,
        heading: "Flexibility",
        subheading: "The ability to switch is an important skill"
    },
    {
        Logo: Logo4,
        heading: "Solve the Problem",
        subheading: "Code your way to the solution"
    }
]

const TimeLineSection = () => {
  return (
    <div className='flex flex-col lg:flex-row gap-10 lg:gap-15 items-center justify-evenly m-5 lg:m-10'>
      {/* Timeline Items */}
      <div className='flex flex-col gap-6'>
        {
          timeline.map((element, index) => {
            return (
              <div className='flex flex-row gap-6 items-center' key={index}>
                <div className='w-[50px] h-[50px]'>
                  <img src={element.Logo} alt={element.heading} className='w-full h-full object-cover' />
                </div>
                <div>
                  <h2 className='font-semibold text-lg sm:text-xl'>{element.heading}</h2>
                  <p className='text-sm sm:text-base'>{element.subheading}</p>
                </div>
              </div>
            )
          })
        }
      </div>

      {/* Image Section */}
      <div className='relative shadow-blue-200 w-full lg:w-auto'>
        <img src={background} alt="Background" className='w-full h-auto object-cover' />
        <div className='absolute bg-green-900 flex flex-col sm:flex-row text-white uppercase py-4 sm:py-6 justify-evenly px-4 sm:px-5 w-full sm:w-[30em]
          translate-x-0 sm:translate-x-[5em] translate-y-[-2em] sm:translate-y-[-3em]'>
          <div className='flex flex-row gap-5 items-center border-r px-5 sm:px-7'>
            <p className='text-2xl sm:text-3xl font-bold'>10</p>
            <p className='text-lg sm:text-xl'>Years of Experience</p>
          </div>
          <div className='flex items-center gap-5 mt-4 sm:mt-0'>
            <p className='text-2xl sm:text-3xl font-bold'>100+</p>
            <p className='text-lg sm:text-xl'>Types of courses</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeLineSection;
