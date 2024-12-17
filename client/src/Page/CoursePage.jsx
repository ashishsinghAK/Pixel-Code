import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { EnrollCourse, fetchCourseDetail } from '../Service/courseDetailAPI';
import { useDispatch, useSelector } from "react-redux"
import { FaGlobeAsia } from "react-icons/fa";
import { FaRupeeSign } from 'react-icons/fa';
import { toast } from "react-hot-toast"
import { addToCart } from '../Reducer/slice/cartSlice';
import { IoVideocamOutline } from "react-icons/io5";
import { LuFolderInput } from "react-icons/lu";


const CoursePage = () => {
  const {user} = useSelector((state)=> state.profile)
  const dispatch = useDispatch()
  const { courseID } = useParams();
  const navigate = useNavigate()
  const [courseData, setCourseData] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    const CourseDetail = async () => {
      const result = await fetchCourseDetail(courseID, token);
      if (result) {
        setCourseData(result);
      }
    }
    CourseDetail();
  }, []);



  const toggleSection = (id) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const enrollButton = async () => {
    await EnrollCourse(courseID, token)
    navigate("/dashboard/enrolled-courses")
  }

  const handleCart = () => {
    if(user && user.accountType==="Instructor"){
      toast.error("Instructor can't buy a course")
      return
    }
    else{
      dispatch(addToCart(courseData))
      navigate("/dashboard/My-Wishlist")
      return
    }
  }


  return (
    <div className='text-white flex justify-center m-5'>
      <div className='flex flex-col gap-10'>

        <div className='flex justify-around bg-slate-900 w-[90vw] rounded-lg p-10'>
          <div>
            {
              courseData && (<div className='flex flex-col gap-4'>
                <p className='text-3xl font-bold'>{courseData?.courseName}</p>
                <p>
                  <span className='text-orange-400'>Instructor: </span>
                  <span className='text-slate-300'>{courseData?.instructor?.firstName}</span>
                  <span className='text-slate-300'>{courseData?.instructor?.lastName}</span>
                </p>
                <p className='flex gap-2'>
                  <span className='text-orange-400'>category:</span>
                  <span className='text-slate-300'>{courseData?.category?.name}</span>
                </p>
                <p className='flex items-center gap-2'>
                  <FaGlobeAsia />
                  <span>English/Hindi</span>
                </p>
                <p className='text-slate-300'>Pace: Self Pace</p>
                <p className='text-slate-300'>Validity: 365 days</p>
                <p>Students Enrolled: {courseData?.studentsEnrolled?.length}</p>

              </div>)
            }
          </div>

          <div className='bg-slate-700 p-5'>
            {
              courseData && (<div className='flex flex-col gap-2'>
                <img src={courseData?.thumbNail} alt="" className='w-[280px] rounded-lg' />
                <p className='flex items-center gap-1 text-xl'>price:
                  <FaRupeeSign />
                  {courseData?.price}
                </p>
                {
                  user ? (
                    <div className='flex flex-col gap-2'>
                  <button className='font-bold text-yellow-400 border p-2 hover:bg-slate-600'
                    onClick={enrollButton}>Buy Now</button>
                  <button className='font-bold border p-2 bg-slate-700 hover:bg-slate-600'
                  onClick={handleCart}>Add to Cart</button>
                </div>
                  ) : (<div className='flex flex-col gap-2'>
                    <p className='text-red-500'>Signup/Login to Buy Course</p>
                    <button className='border p-2 bg-yellow-500 text-black font-semibold rounded-lg'
                    onClick={() => navigate("/signup")}>Signup</button>
                  </div>)
                  
                }
              </div>)
            }
          </div>
        </div>

        <div className='flex flex-col gap-5  p-8 rounded-lg'>
          <p><span className='text-slate-300 text-2xl'>What will you learn: </span> 
          {courseData?.whatYouWillLearn}</p>
          <p className='text-4xl'>Course Content:</p>
          <p>Total sections: {courseData?.courseContent?.length || 0}</p>

          {courseData?.courseContent?.length > 0 ? (
            courseData.courseContent.map((section) => (
              <div
                key={section._id}
                className='p-5 bg-slate-900 rounded-lg'
              >
                {/* Section Name */}
                <div
                  className='flex items-center justify-between cursor-pointer'
                  onClick={() => toggleSection(section._id)}
                >
                  <div className='flex items-center gap-2'>
                  <LuFolderInput className='text-yellow-500 font-semibold' />
                  <p className='text-xl font-semibold'>{section.sectionName}</p>
                  </div>
                  <span
                    className={`transition-transform ${expandedSections[section._id] ? 'rotate-180' : ''
                      }`}
                  >
                    ▼
                  </span>
                </div>

                {/* Subsection Titles */}
                {expandedSections[section._id] && (
                  <div className='mt-3'>
                    {section?.subSection?.length > 0 ? (
                      <ul className='pl-5 list-disc list-inside'>
                        {section.subSection.map((sub) => (
                          <div className='flex items-center gap-2'>
                            <IoVideocamOutline />
                            <li
                            key={sub._id}
                            className='text-slate-400'
                          >
                            {sub.title}
                          </li>
                          </div>
                        ))}
                      </ul>
                    ) : (
                      <p className='text-slate-400'>
                        No subsections available.
                      </p>
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