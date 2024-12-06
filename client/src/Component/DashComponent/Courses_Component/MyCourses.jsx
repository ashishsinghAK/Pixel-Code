import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"
import { InstructorCourseDetail } from '../../../Service/courseDetailAPI'

export const MyCourses = () => {
  const navigate = useNavigate()
  const {token} = useSelector((state)=> state.auth)
  const {user} = useSelector((state)=>state.profile)
  const [courses,setCourses] = useState();
  const [loading,setLoading] = useState(null);

  useEffect(() => {
    const fetchCourses = async() => {
      setLoading(true)
      const result = await InstructorCourseDetail(user._id,token);
      setLoading(false)
      if(result){
        setCourses(result);
      }
    }
    fetchCourses();
  },[])
  return (
    <div className='text-white'>
      <div>
        <div>
          <p className='text-3xl '>My Courses</p>
          <button>Add Course</button>
        </div>
      </div>
    </div>
  )
}

export default MyCourses
