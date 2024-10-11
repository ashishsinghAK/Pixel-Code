import React from 'react'
import "../App.css"
import { FaArrowRightToBracket } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import TextHighlight from '../Component/homePage/TextHighlight';
import CTAButton from '../Component/homePage/Button'
import video from "../Media/coding_video.mp4"
import CodeBlock from '../Component/homePage/CodeBlock';
import { TypingAnimation } from '../Component/homePage/TypingAnimation';
import TimeLineSection from '../Component/homePage/TimeLineSection';
import { Button } from "flowbite-react"
import { LearningSection } from '../Component/homePage/LearningSection';
import InstructorSection from '../Component/homePage/InstructorSection';
import { Foot } from '../Component/homePage/Foot';

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      {/* section1 */}
      <div className='text-white relative mx-auto flex flex-col  
        items-center justify-between max-w-screen-lg sm:px-5'>
        <Link to={"/signup"}>
          <div className='mt-10 p-2 mx-auto rounded-full bg-slate-800 font-bold 
             transition-all duration-200 hover:scale-95 w-fit hover:bg-slate-700 
             flex flex-row items-center gap-2 px-10'>
            <p>Become an Instructor</p>
            <FaArrowRightToBracket />
          </div>
        </Link>

        <div className='text-center text-4xl font-semibold mt-4'>
          Empower your Future with
          <TextHighlight text={" Coding Skills"} />
        </div>

        <div className='mt-4 text-center text-md font-bold text-gray-400 px-4 sm:px-8'>
          With our online coding Courses, you can learn at your own pace, from anywhere in the world
          and get access to a wealth of resources, including hands-on projects, quizzes, and personalized
          feedback from the instructors.
        </div>

        <div className='flex flex-row gap-5 mt-8'>
          <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
          <CTAButton active={false} linkto={"/login"}>Book a Demo</CTAButton>
        </div>

        <div className='shadow-blue-200  my-8 w-full  sm:px-6'>
          <video muted loop autoPlay className='w-full h-auto'>
            <source src={video} type="video/mp4" />
          </video>
        </div>

        {/* code section 1 */}
        <div className='flex flex-col lg:flex-row gap-10 m-5 lg:mx-10'>
          <CodeBlock heading={"Unlock your Coding Potential with our"} text={" online courses"}
            subheading={"Our courses are designed and taught by Industry Experts who have years of experience in coding and Development"}
            btn1={<CTAButton linkto={"/signup"} children={"Try it Yourself"} active={true} />}
            btn2={<CTAButton linkto={"/login"} children={"Learn More"} active={false} />} />

          <TypingAnimation codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">
                  <title>Pixel-Code</title>\n</head>\n<body>\n <h1>Welcome to PIXEL-CODE</h1>
                  </body>\n</html>`} />
        </div>

      </div>

      {/* section2 */}
      <div className=' flex flex-col w-full bg-blue-50'>
        <div className='homepage_bg h-[20vh] flex justify-center items-center gap-10'>
          <CTAButton linkto={"/signup"} active={true}>
            Explore Full Catalog
          </CTAButton>

          <Link to="/signup">
            <div className='bg-slate-600 rounded-md hover:scale-95 transition-all duration-200'>
              <Button className='font-bold w-fit p-1'>
                Learn More
              </Button>
            </div>
          </Link>
        </div>

        <div className='flex flex-col lg:flex-row justify-center font-bold p-5 gap-5'>
          <div className='w-full lg:w-[50%] text-2xl text-center lg:text-left'>
            Get the skills you need for a <TextHighlight text={"job that is in demand"} />
          </div>
          <div className='w-full lg:w-[50%] text-xl flex flex-col gap-5'>
            <div>The modern PIXEL-CODE dictates its own terms. Today,
              being a competitive specialist requires more than professional skills.
            </div>
            <CTAButton active={true} children={"Learn More"} linkto={"/signup"} className='text-white' />
          </div>
        </div>

        <TimeLineSection />
        <LearningSection />
      </div>

      {/* section 3 */}
      <div className='flex flex-col m-5 items-center'>
        <InstructorSection />
        <p className='text-3xl text-slate-300'>Review from other Learners</p>
        {/* review slider */}
      </div>

      {/* footer */}
      <div className='w-11/12'>
        <Foot />
      </div>

    </div>
  )
}

export default Home;
