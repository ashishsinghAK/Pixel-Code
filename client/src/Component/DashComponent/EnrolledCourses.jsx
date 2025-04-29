import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { EnrolledCourse } from '../../Service/profileAPI';
// import ProgressBar from "@ramonak/react-progress-bar";
import { Link } from "react-router-dom";

function EnrolledCourses() {
    const { token } = useSelector((state) => state.auth);
    const [courseEnroll, setCourseEnroll] = useState(null);

    const enrolledCourse = async () => {
        try {
            const response = await EnrolledCourse(token);
            setCourseEnroll(response);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        enrolledCourse();
    }, []);

    return (
        <div className='flex justify-center '>
            <div className='text-white m-5 sm:m-8 lg:m-14 sm:w-full justify-center items-center'>
                <h1 className='text-2xl sm:text-3xl lg:text-4xl mb-5'>Enrolled Courses</h1>
                {
                    !courseEnroll ? (
                        <div className="text-center text-gray-300">Loading...</div>
                    ) : (
                        courseEnroll.length === 0 ? (
                            <div className="text-center text-gray-300">You have not enrolled in any course yet</div>
                        ) : (
                            <div className="space-y-6">
                                {/* Courses List */}
                                {
                                    courseEnroll.map((course, index) => (
                                        <div
                                            key={index}
                                            className='border border-gray-700 rounded-lg p-8 flex flex-col sm:flex-row items-center gap-4 sm:w-[100vw] md:w-[75vw]'
                                        >
                                            {/* Course Details */}
                                            <Link className='w-full sm:w-[60%] flex flex-col sm:flex-row items-center gap-4'
                                                to={`/view-course/${course?._id}/section/
                                        ${course?.courseContent?.[0]?._id}/sub-section/
                                        ${course?.courseContent?.[0]?.subSection?.[0]?._id}`}>
                                                <img
                                                    src={course?.thumbNail}
                                                    className='w-[100px] sm:w-[150px] lg:w-[150px] rounded-lg object-cover'
                                                    alt="Course Thumbnail"
                                                />
                                                <div className='flex flex-col gap-2 text-center sm:text-left'>
                                                    <p className="text-sm sm:text-base">
                                                        <span className='text-slate-300'>Course Name:</span> {course?.courseName}
                                                    </p>
                                                    <p className="text-sm sm:text-base">
                                                        <span className='text-yellow-300'>Free</span> 
                                                    </p>
                                                    <p><span className='text-red-500'>Description:</span>{course.courseDescription}</p>
                                                </div>
                                                {/* <div>duration{course?.totalDuration || 0}</div> */}
                                            </Link>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    )
                }
            </div>
        </div>
    );
}

export default EnrolledCourses;

