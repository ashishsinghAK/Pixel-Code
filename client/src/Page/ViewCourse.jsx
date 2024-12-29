import React, { useEffect } from 'react';
import CourseSideBar from '../Component/CourseComponent/CourseSideBar';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseDetail } from "../Service/courseDetailAPI";
import { setCompletedLectures, setCourseEntireData, setCourseSectionData, setTotalNoLectures } from '../Reducer/slice/viewCourseSlice';
import VideoSection from '../Component/CourseComponent/VideoSection';

function ViewCourse() {
    const { courseId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const courseDetail = async () => {
            if(!courseId){
                return;
            }
            const courseData = await fetchCourseDetail(courseId, token);
            console.log('course data', courseData);
            if(!courseData){
                return;
            }
            // dispatch(setCourseSectionData(courseData.courseDetail.courseContent));
            // dispatch(setCourseEntireData(courseData.courseDetail))
            // dispatch(setCompletedLectures(courseData.completedVideo))
            dispatch(setCourseSectionData(courseData.courseContent));
            dispatch(setCourseEntireData(courseData));
            dispatch(setCompletedLectures(courseData.completedVideo));
            let lecture = 0;
            courseData?.courseContent?.forEach((sec) => {
                lecture += sec.subSection.length;
            });
            dispatch(setTotalNoLectures(lecture));
        };
        courseDetail();
    }, []);

    return (
        <div className='flex h-[100vh] items-center'>

            <CourseSideBar />
            <VideoSection/>

        </div>
    );
}

export default ViewCourse;
