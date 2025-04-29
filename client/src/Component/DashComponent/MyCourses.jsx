// This is protected route for the Instructor only

import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { InstructorCourseDetail } from '../../Service/courseDetailAPI'
import Spinner from "../Common/Spinner"
import CourseData from './CourseData'

export const MyCourses = () => {
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [courses, setCourses] = useState();
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true)
      const result = await InstructorCourseDetail(user._id, token);
      setLoading(false)
      if (result) {
        setCourses(result);
      }
    }
    fetchCourses();
  }, [])
  return (
    <div className='text-white w-[75vw]'>
    
        <div className='flex justify-around m-5'>
          <p className='text-3xl '>My Courses</p>
          <button
            onClick={() => navigate("/dashboard/add-course")}
            className='text-black font-bold bg-yellow-500 p-3 rounded-lg'
          >Add Course</button>
        </div>
        {loading == true ? <div className="flex justify-center items-center ">
          <Spinner />
        </div> : (
          <>{courses && <CourseData courses={courses} setCourses={setCourses} />}</>
        )}
      
    </div>
  )
}

export default MyCourses
