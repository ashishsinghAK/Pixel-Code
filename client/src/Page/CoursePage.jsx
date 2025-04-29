import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { EnrollCourse, fetchCourseDetail } from '../Service/courseDetailAPI'
import { useDispatch, useSelector } from "react-redux"
import { FaGlobeAsia } from "react-icons/fa"
import { toast } from "react-hot-toast"
import { addToCart } from '../Reducer/slice/cartSlice'
import { IoVideocamOutline } from "react-icons/io5"
import { LuFolderInput } from "react-icons/lu"

const CoursePage = () => {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const { courseID } = useParams()
  const navigate = useNavigate()
  const [courseData, setCourseData] = useState(null)
  const { token } = useSelector((state) => state.auth)
  const [expandedSections, setExpandedSections] = useState({})

  useEffect(() => {
    const CourseDetail = async () => {
      const result = await fetchCourseDetail(courseID, token)
      if (result) {
        setCourseData(result)
      }
    }
    CourseDetail()
  }, [courseID, token])

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const enrollButton = async () => {
    await EnrollCourse(courseID, token)
    navigate("/dashboard/enrolled-courses")
  }

  const handleCart = () => {
    if (user && user.accountType === "Instructor") {
      toast.error("Instructors can't buy a course")
      return
    }
    dispatch(addToCart(courseData))
    navigate("/dashboard/My-Wishlist")
  }

  return (
    <div className='text-white flex justify-center px-4 py-8'>
      <div className='w-full max-w-6xl flex flex-col gap-10'>

        {/* Course Info Section */}
        <div className='flex flex-col md:flex-row gap-8 bg-slate-900 p-6 rounded-lg shadow-lg'>

          {/* Course Details */}
          <div className='flex-1'>
            {courseData && (
              <div className='flex flex-col gap-4'>
                <h1 className='text-2xl md:text-3xl font-bold'>{courseData.courseName}</h1>
                <p>
                  <span className='text-orange-400'>Instructor: </span>
                  <span className='text-slate-300'>
                    {courseData.instructor?.firstName} {courseData.instructor?.lastName}
                  </span>
                </p>
                <p className='flex gap-2'>
                  <span className='text-orange-400'>Category:</span>
                  <span className='text-slate-300'>{courseData.category?.name}</span>
                </p>
                <p className='flex items-center gap-2'>
                  <FaGlobeAsia />
                  <span>English / Hindi</span>
                </p>
                <p className='text-slate-300'>Pace: Self-Paced</p>
                <p className='text-slate-300'>Validity: 365 days</p>
                <p className='text-slate-300'>Students Enrolled: {courseData.studentsEnrolled?.length}</p>
              </div>
            )}
          </div>

          {/* Thumbnail & Actions */}
          <div className='w-full md:w-[40%] lg:w-[300px] bg-slate-800 rounded-lg p-4 flex flex-col items-center mx-auto'>
            {courseData && (
              <>
                <img
                  src={courseData.thumbNail}
                  alt="Course Thumbnail"
                  className='w-full rounded-md mb-4 max-h-[250px] object-cover'
                />
                {user ? (
                  <div className='flex flex-col gap-3 w-full'>
                    <button
                      className='bg-yellow-400 text-black font-semibold py-2 rounded-md hover:bg-yellow-500 transition-all'
                      onClick={enrollButton}
                    >
                      Enroll for Free
                    </button>
                    <button
                      className='border border-white py-2 rounded-md hover:bg-slate-700 transition-all'
                      onClick={handleCart}
                    >
                      Add to Cart
                    </button>
                  </div>
                ) : (
                  <div className='flex flex-col gap-3 w-full'>
                    <p className='text-red-500 text-center text-sm'>Sign up or log in to buy course</p>
                    <button
                      className='bg-yellow-500 text-black font-semibold py-2 rounded-md hover:bg-yellow-600'
                      onClick={() => navigate("/signup")}
                    >
                      Signup
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* What Will You Learn */}
        <div className='flex flex-col gap-5 bg-slate-900 p-6 rounded-lg'>
          <p className='text-xl md:text-2xl text-slate-300'>
            <span className='font-semibold'>What you'll learn:</span> {courseData?.whatYouWillLearn}
          </p>

          <p className='text-3xl font-semibold text-yellow-500'>Course Content</p>
          <p className='text-slate-300'>Total Sections: {courseData?.courseContent?.length || 0}</p>

          {courseData?.courseContent?.length > 0 ? (
            courseData.courseContent.map((section) => (
              <div key={section._id} className='p-5 bg-slate-800 rounded-lg'>
                <div
                  className='flex items-center justify-between cursor-pointer'
                  onClick={() => toggleSection(section._id)}
                >
                  <div className='flex items-center gap-2'>
                    <LuFolderInput className='text-yellow-500 font-semibold' />
                    <p className='text-lg font-semibold'>{section.sectionName}</p>
                  </div>
                  <span className={`transition-transform ${expandedSections[section._id] ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>

                {expandedSections[section._id] && (
                  <div className='mt-3'>
                    {section?.subSection?.length > 0 ? (
                      <ul className='pl-5 list-disc list-inside'>
                        {section.subSection.map((sub) => (
                          <li key={sub._id} className='flex items-center gap-2 text-slate-400'>
                            <IoVideocamOutline />
                            {sub.title}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className='text-slate-400'>No subsections available.</p>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className='text-slate-400'>No sections available.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default CoursePage
