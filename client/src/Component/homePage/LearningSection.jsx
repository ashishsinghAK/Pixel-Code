import React from 'react'
import TextHighlight from './TextHighlight'

export const LearningSection = () => {
  return (
    <div className='m-5 md:m-10'>
      <div className='flex flex-col gap-5 items-center font-bold'>
        {/* Heading */}
        <p className='text-3xl sm:text-4xl md:text-5xl font-semibold text-center'>
          Your Swiss knife for 
          <TextHighlight text={" Learning any Language"} />
        </p>

        {/* Subheading */}
        <p className='font-semibold text-center w-[90%] sm:w-[75%] lg:w-[50%]'>
          Using spin makes learning multiple languages easy. With 20+ languages, realistic voice-over, 
          progress tracking, custom schedules, and more.
        </p>
      </div>
    </div>
  )
}
