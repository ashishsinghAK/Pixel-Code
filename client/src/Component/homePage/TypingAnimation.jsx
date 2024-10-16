import React from 'react'
import { TypeAnimation } from "react-type-animation";

export const TypingAnimation = ({ codeblock }) => {
  return (
    <div className='flex flex-row h-fit text-lg w-[90%] p-5 border-slate-500 border-r-amber-500 border-b-amber-500 border-2 rounded-lg'>
      <div className=' flex flex-col w-[10%] text-gray-500 font-bold '>
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>6</p>
        <p>7</p>
        <p>8</p>
        <p>9</p>
        <p>10</p>
        <p>11</p>
      </div>

      <div className=' flex flex-row gap-2 font-bold font-mono text-slate-300'>
        <TypeAnimation
          sequence={[codeblock, 3000, ""]}
          repeat={Infinity}
          cursor={true}
          style={
            {
              whiteSpace: 'pre-line',
              display: "block",
            }
          }
          omitDeletionAnimation={true}
        />
      </div>
    </div>
  )
}
