import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { IoAddCircleOutline } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import NestedCourseView from './NestedCourseView';
import { toast } from 'react-hot-toast';
import { setEditCourse, setStep, setCourse } from '../../../Reducer/slice/courseSlice';
import { updateSection, createSection } from "../../../Service/courseDetailAPI"



function CourseBuilder() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { course } = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [editSection, setEditSection] = useState(true)
    const { token } = useSelector((state) => state.auth);

    function renderNext() {
        if (course.courseContent.length === 0) {
            toast.error('Enter at least one section');
            return
        }
        if (course.courseContent.some((section) => section.subSection.length === 0)) {
            toast.error('please attach one lecture in each section')
            return
        }
        // if all is good 
        dispatch(setStep(3))
    }

    const submitHandler = async (data) => {
        console.log(data.sectionName);
        console.log('course builder course', course)
        console.log('logging course id', course._id)

        setLoading(true);
        let result = await createSection({
            sectionName: data.sectionName,
            courseId: course._id,
        }, token)
        console.log('result in course builder', result);
        if (result) {
            dispatch(setCourse(result))
            setValue("sectionName", "")
        }
        setLoading(false);
    }
    return (
        <div className='p-10 flex items-center flex-col'>
            <p className='text-3xl mb-5'>Course Builder</p>
            <form action="" className="flex flex-col gap-5 w-[50vw] p-5 bg-gray-900 rounded-lg shadow-md"
                onSubmit={handleSubmit(submitHandler)}>
                <div className='flex flex-col'>
                    <label htmlFor="sectionName">Add Section<sup className="text-red-500">*</sup></label>
                    <input type="text" id='sectionName'
                        placeholder='Add section name'
                        {...register("sectionName", { required: true })}
                        className="bg-slate-800 p-2 rounded-md"
                    />
                    {
                        errors.sectionName && (
                            <span className="text-red-500">Section Name is Required</span>
                        )
                    }
                </div>
                <div className=' w-fit p-2 bg-yellow-500 text-black font-bold'>
                    <button type='submit' className='flex items-center gap-2'

                    >
                        create section
                        <IoAddCircleOutline />
                    </button>
                </div>
            </form>
            
            {course.courseContent?.length > 0 && (
                <NestedCourseView />
            )}
            <button type='button' onClick={renderNext} className='bg-orange-500 p-2 font-bold text-black rounded-md w-24 m-5'>
                Next
            </button>
        </div>
    )
}

export default CourseBuilder