import React from 'react'
import TextHighlight from '../Component/homePage/TextHighlight'
import about1 from "../Media/about1.jpeg"
import about2 from "../Media/about2.png"
import about3 from "../Media/about3.jpg"
import Section_3 from "../Component/About/Section_3"
import ContactFormSection from "../Component/About/ContactFormSection"

function About() {
    return (
        <div className='text-white flex flex-col items-center justify-center w-[100vw]'>

            {/* section 1 */}
            <section className='bg-slate-800  flex flex-col items-center justify-center relative h-[40vh]'>
                <h1 className='text-4xl m-5 font-bold'>
                    Driving Innovation in Online Education for a <TextHighlight text={"Brighter Future"} />
                </h1>
                <p className=' text-slate-400 w-3/4 m-10 flex flex-col items-center text-center'>
                    PIXEL-CODE  is a tool for driving innovation in online education. We are passionate about creating
                    a brighter future by offering cutting-edge courses. We offer emerging technologies and, nurturing
                    a vibrant learning community.
                </p>
                <div className='flex gap-10 absolute translate-y-[12em]'>
                    <img src={about1} className='w-[20vw]' />
                    <img src={about2} className='w-[20vw]' />
                    <img src={about3} className='w-[20vw]' />
                </div>
            </section>


            {/* section 2 */}
            <section className='mt-[7em] text-3xl w-11/12 text-center'>
                We are Passionate about Revolutionizing the way we learn. Our innovative Platform <TextHighlight text={"combines technologies"} />
                ,experience, and community to create an 
                <span className='text-orange-600 font-bold'> Unparalleled educational experience.</span>
            </section>


            {/* section 3 */}
            <Section_3/>

            {/* section 4 */}
            <ContactFormSection/>
            


        </div>
    )
}

export default About