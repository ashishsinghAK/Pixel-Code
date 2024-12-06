import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { FaCheck } from "react-icons/fa"
import CourseInformation from './CourseInformation'
import CourseBuilder from './CourseBuilder'
import { setStep } from '../../../Reducer/slice/courseSlice'
import PublishCourse from './PublishCourse'

function AddCourse() {
  const { step } = useSelector((state) => state.course)
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(setStep(1))
  // }, [])


  const steps = [
    {
      id: 1,
      title: "Course Information"
    },
    {
      id: 2,
      title: "Course Builder"
    },
    {
      id: 3,
      title: "Publish"
    }
  ]


  return (
    <div className='text-white flex flex-col'>

      <div className='text-4xl flex justify-center m-5 font-serif text-blue-500 font-semibold'>
        Add New Course
      </div>

      <div>
        <div className='flex text-center justify-evenly font-bold m-5'>
          {
            steps.map((item) => (
              <div key={item.id} className={`${step === item.id ? "bg-yellow-600 border-yellow-50 text-yellow-50 rounded-full w-[2.5em] h-[2.5em] flex justify-center items-center"
                : "border-slate-700 bg-slate-500 text-white rounded-full w-[2.5em] h-[2.5em] flex justify-center items-center"}`}>
                {
                  step > item.id ? (<FaCheck />) : (item.id)
                }
              </div>
            ))
          }


        </div>
      </div>

      <div className='w-full flex justify-center'>
        {step === 1 && <CourseInformation />}
        {step === 2 && <CourseBuilder />}
        {step === 3 && <PublishCourse />}

      </div>

    </div>
  )
}

export default AddCourse