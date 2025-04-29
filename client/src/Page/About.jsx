import React from 'react';
import TextHighlight from '../Component/homePage/TextHighlight';
import about1 from "../Media/about1.jpeg";
import about2 from "../Media/about2.png";
import about3 from "../Media/about3.jpg";
import Section_3 from "../Component/About/Section_3";

function About() {
  return (
    <div className='text-white flex flex-col items-center w-full'>

      {/* Section 1 */}
      <section className='bg-slate-800 flex flex-col items-center justify-center relative py-10 min-h-[40vh] px-4 md:px-0'>
        <h1 className='text-2xl md:text-4xl font-bold text-center mb-4'>
          Driving Innovation in Online Education for a <TextHighlight text={"Brighter Future"} />
        </h1>

        <p className='text-slate-400 text-sm md:text-base text-center max-w-3xl mb-6'>
          PIXEL-CODE is a tool for driving innovation in online education. We are passionate about creating
          a brighter future by offering cutting-edge courses. We offer emerging technologies and nurture
          a vibrant learning community.
        </p>

        {/* Images Section */}
        <div className='flex flex-col md:flex-row gap-6 md:gap-10 mt-6 md:mt-12 overflow-x-auto md:overflow-visible px-4 w-full justify-center items-center'>
          <img src={about1} className='w-[80%] md:w-[20vw] rounded-lg shadow-md' />
          <img src={about2} className='w-[80%] md:w-[20vw] rounded-lg shadow-md' />
          <img src={about3} className='w-[80%] md:w-[20vw] rounded-lg shadow-md' />
        </div>
      </section>

      {/* Section 2 */}
      <section className='mt-12 px-4 md:px-0 w-full max-w-5xl text-center text-lg md:text-3xl leading-relaxed'>
        We are passionate about revolutionizing the way we learn. Our innovative platform <TextHighlight text={"combines technologies"} />,
        experience, and community to create an
        <span className='text-orange-600 font-bold'> unparalleled educational experience.</span>
      </section>

      {/* Section 3 */}
      <Section_3 />

      
      

    </div>
  );
}

export default About;
