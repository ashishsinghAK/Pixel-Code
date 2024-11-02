import React from 'react'
import TextHighlight from '../homePage/TextHighlight'

const Section_3 = () => {
    return (
        <div className='flex w-11/12 justify-center m-20 gap-10'>
            {/* left  */}
            <div className='w-[50vw] flex flex-col gap-5'>
                <h1 className='text-orange-600 text-3xl font-bold'>Our Vision</h1>
                <p className='text-slate-400'>
                    With this vision in mind, we set out on a journey to create an
                    e-learning platform that would revolutionize the way people learn.
                    Our team of dedicated expert worked to develop a robust and intutive
                    platform that combine all the cutting-edge technologies with
                    engaging content.
                </p>
            </div>


            {/* right */}
            <div className='w-[50vw] flex flex-col gap-5'>
                <div className="text-3xl font-bold">
                    <TextHighlight text={"Our Mission"} />
                </div>

                <p className='text-slate-400'>
                    Our mission goes beyond just delevering courses online.
                    We want to create a vibrant community of learners, where individuals
                    can connect, collaborate and learn from one another.
                </p>
            </div>
        </div>
    )
}

export default Section_3