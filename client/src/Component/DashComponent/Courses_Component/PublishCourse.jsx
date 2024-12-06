import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from "react-redux"
import {useNavigate} from "react-router-dom"
import { resetCourseState } from '../../../Reducer/slice/courseSlice'

function PublishCourse() {
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(null);
    const navigate = useNavigate();

    // useEffect(()=>{
    //     if(course?.status===COURSE_STATUS.PUBLISHED){
    //         setValue("public",true);
    //     }
    // },[])

    // const goToCourse = () => {
    //     dispatch(resetCourseState());
    //     //navigate("/dashboard/my-courses")
    // }

    const handleCoursePublish = () => {
        // if(course?.status===COURSE_STATUS.PUBLISHED && getValues("public"===true) || 
        // course?.status===COURSE_STATUS.DRAFT && getValues("public"===false)){
        //     //no updation in form
        //     goToCourse();
        //     return;
        // }
        // // if form is updated
        // const formData = new formData();
        // formData.append("courseId",course._id)
        // const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
        // formData.append("status",courseStatus);
        // setLoading(true);
        // const result = await editCourseDetail(formData,token)
        // if(result){
        //     goToCourse();
        // }
        // setLoading(false);

        console.log(course);
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses")
    }

    const onSubmit = () => {
        handleCoursePublish();
    }

    return (
        <div className='text-white w-[50vw] border-2 rounded-lg flex items-center flex-col bg-slate-800 '>
            <div className='m-8 flex flex-col items-center'>
                <p className='text-3xl'>Publish Course</p>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center'>
                    <div className='flex gap-5 items-center m-5'>
                        <input type="checkbox"
                            id='public'
                            {...register("public", { required: true })}
                            className='rounded h-4 w-4'
                        />
                        <label htmlFor="public" className='text-xl'>I agree to publish this course</label>
                    </div>
                    <button className='text-yellow-500 border-2 border-yellow-500 
                    rounded-lg h-[2.5em] font-bold w-[6em]'
                        disabled={loading}>
                        Save
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PublishCourse