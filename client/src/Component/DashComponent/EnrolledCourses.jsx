import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { toast } from "react-hot-toast"
import { EnrolledCourse } from '../../Service/profileAPI'
import ProgressBar from "@ramonak/react-progress-bar";

function EnrolledCourses() {
    const { token } = useSelector((state) => state.auth)
    const [courseEnroll, setCourseEnroll] = useState(null)


    const enrolledCourse = async () => {
        try {
            const response = await EnrolledCourse(token);
            setCourseEnroll(response);
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        enrolledCourse();
    }, [])

    return (
        <div className='text-white'>
            <h1>Enrolled Courses</h1>
            {
                !courseEnroll ? (<div>Loading...</div>) : (courseEnroll.length == 0 ? (<div>You have not enrolled in any course yet</div>) : (
                    <div>
                        <div>
                            <p>Course Name</p>
                            <p>Duration</p>
                            <p>Progress</p>
                        </div>

                        {
                            courseEnroll.map((course, index) => (
                                <div>
                                    <div>
                                        <img src={course?.thumbNail} />
                                        <div>
                                            <p>{course?.courseName}</p>
                                            <p>{course?.courseDescription}</p>
                                        </div>
                                    </div>

                                    <div>
                                        {course?.totalDuration}
                                    </div>

                                    <div>
                                        <p>Progress:{course?.progressPercentage || 0}%</p>
                                        <ProgressBar
                                            completed={course.progressPercentage || 0}
                                            height='8px'
                                            isLabelVisible={false}
                                        />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default EnrolledCourses