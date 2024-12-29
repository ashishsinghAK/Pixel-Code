import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection } from '../../../Service/courseDetailAPI';
import { setCourse } from '../../../Reducer/slice/courseSlice';
import { RxCross2 } from "react-icons/rx";
import { FaRegSave } from "react-icons/fa";
import Spinner from "../../Common/Spinner"

function SubSectionModal(
    { modalData,
        setModalData,
    }
) {
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const [videoPreview, setVideoPreview] = useState(null);
    useEffect(() => {
        setValue("lectureTitle", modalData.title);
        setValue("lectureDesc", modalData.description);
        setValue("lectureVideo", modalData.videoUrl);

    }, [])


    const onSubmit = async (data) => {
        const formData = new FormData()
        formData.append("sectionID", modalData)
        formData.append("title", data.lectureTitle)
        formData.append("description", data.lectureDesc)
        formData.append("videoUrl", data.lectureVideo[0])
        formData.append("courseID", course._id)

        setLoading(true)
        let result = await createSubSection(formData, token);
        console.log("create subsection result", result);
        if (result) {
            dispatch(setCourse(result))
        }
        setModalData(null);
        setLoading(false);
    }

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideoPreview(URL.createObjectURL(file))
        }
    }


    return (
        <div className=' bg-slate-900 p-2 flex flex-col gap-10'>
            <div className='flex justify-between'>
                <p className='text-3xl font-semibold text-orange-500 font-mono'>Adding Lecture</p>
                <button onClick={() => (!loading ? setModalData(null) : {})}><RxCross2 className='text-xl font-semibold' /></button>
            </div>
            {
                loading ? (<div className="flex justify-center items-center">
                    <Spinner />
                </div>) : (
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
                        <div className='flex flex-col'>
                            <label htmlFor="lectureVideo" className='text-slate-300'>Select Course Video</label>
                            <input type="file"
                                id='lectureVideo'
                                className="bg-slate-800 p-2 rounded-md"
                                {...register("lectureVideo", { new: true })}
                                onChange={(e) => { handleVideoChange(e) }}
                            />
                            {
                                errors.lectureVideo && (
                                    <span className="text-red-500">Lecture Video is Required</span>
                                )
                            }
                            {
                                videoPreview && (
                                    <div>
                                        <p>Video Preview</p>
                                        <video src={videoPreview} className="mt-2 rounded-md w-full h-auto max-h-64 object-cover md:max-h-80"></video>
                                    </div>
                                )
                            }
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="lectureTitle">Lecture Title<sup className="text-red-500">*</sup></label>
                            <input type="text" id='lectureTitle'
                                placeholder='Enter Lecture Title'
                                {...register("lectureTitle", { required: true })}
                                className='bg-slate-800 p-2 rounded-md'
                            />
                            {
                                errors.lectureTitle && (<span className="text-red-500">
                                    Lecture Title is Required
                                </span>)
                            }
                        </div>
                        <div>
                            <label htmlFor="lectureDesc">Lecture Description<sup className="text-red-500">*</sup></label>
                            <textarea type="text" id='lectureDesc'
                                placeholder='Enter Lecture Description'
                                {...register("lectureDesc", { required: true })}
                                className='w-full min-h-[130px] bg-slate-800 p-2 rounded-md'
                            />
                            {
                                errors.lectureDesc && (<span className="text-red-500">
                                    Lecture Description is Required
                                </span>)
                            }
                        </div>
                        <button type='submit' className='flex items-center gap-2 
                    justify-center text-yellow-500 border-2 border-yellow-500 rounded-lg h-[2.5em] font-bold w-[6em] '>
                            Save
                            <FaRegSave />
                        </button>
                    </form>
                )
            }
        </div>
    )
}

export default SubSectionModal