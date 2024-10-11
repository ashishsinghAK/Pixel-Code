import React from 'react'
import Button from "../homePage/Button";
import TextHighlight from './TextHighlight';

const CodeBlock = ({
  heading, subheading, btn1, btn2, text
}) => {
  return (
    <div className='m-5 md:m-8 lg:m-10'>
      <div className='text-2xl sm:text-3xl md:text-4xl font-semibold font-sans text-center md:text-left'>
        {heading}
        <TextHighlight text={text} />
      </div>
      <div className='mt-4 text-sm sm:text-md md:text-lg font-bold text-gray-500 text-center md:text-left'>
        {subheading}
      </div>
      <div className='flex flex-col sm:flex-row gap-4 sm:gap-8 mt-5 sm:mt-8'>
        {btn1}
        {btn2}
      </div>
    </div>
  )
}

export default CodeBlock;
