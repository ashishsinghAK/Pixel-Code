import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { getCourseCategory, createCourse } from '../../../Service/courseDetailAPI';
import { FaRupeeSign } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { setCourse, setStep } from '../../../Reducer/slice/courseSlice';
import Spinner from '../../Common/Spinner';

function CourseInformation() {
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
    const { course, editCourse } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [courseCategory, setCourseCategory] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const dispatch = useDispatch();

    const [requirement, setRequirement] = useState("");
    const [tagList, setTagList] = useState([]);

    const addTag = () => {
        if (requirement) {
            setTagList([...tagList, requirement]);
            setRequirement("");
        }
    };

    const removeTag = (index) => {
        const updatedList = [...tagList];
        updatedList.splice(index, 1);
        setTagList(updatedList);
    };

    useEffect(() => {
        const getCategory = async () => {
            setLoading(true);
            const category = await getCourseCategory(token);
            if (category.length > 0) {
                setCourseCategory(category);
            }
            setLoading(false);
        };
        getCategory();

        if (editCourse) {
            setValue('courseTitle', course.courseName);
            setValue('courseDesc', course.courseDescription);
            // setValue('coursePrice', course.price);
            setTagList(course.tag || []);
            setValue('courseBenifit', course.whatYouWillLearn);
            setValue('courseCategory', course.category._id);
            setValue('courseImage', course.thumbNail);
        }
    }, []);

    useEffect(() => {
        setValue("courseTag", tagList);
    }, [tagList]);

    const onSubmit = async (data) => {
        const formData = new FormData();

        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseDesc);
        // formData.append("price", data.coursePrice);
        formData.append("whatYouWillLearn", data.courseBenifit);
        formData.append("tag", JSON.stringify(tagList));
        formData.append("categoryId", data.courseCategory);
        formData.append("thumbNail", data.courseImage[0]);

        setLoading(true);
        const result = await createCourse(formData, token);
        console.log('result of course information', result);
        if (result) {
            dispatch(setStep(2));
            dispatch(setCourse(result));
        }
        setLoading(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <div >
            <div className="text-white  flex justify-center items-center min-h-screen bg-gray-800 p-4 rounded-lg max-w-[80vw]">
                {loading === true ? (<div className="flex justify-center items-center w-[50vw] bg-slate-900 min-h-screen">
                    <Spinner />
                </div>) : (
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-5 w-[70vw] p-5 bg-gray-900 rounded-lg shadow-md"
                    >
                        {/* Course Title */}
                        <div className="flex flex-col">
                            <label htmlFor="courseTitle">Title <sup className="text-red-500">*</sup></label>
                            <input
                                type="text"
                                id="courseTitle"
                                placeholder="Enter Course Title"
                                className="bg-slate-800 p-2 rounded-md"
                                {...register("courseTitle", { required: true })}
                            />
                            {errors.courseTitle && (
                                <span className="text-red-500">Course Title is Required</span>
                            )}
                        </div>

                        {/* Course Description */}
                        <div className="flex flex-col">
                            <label htmlFor="courseDesc">Course Description <sup className="text-red-500">*</sup></label>
                            <textarea
                                id="courseDesc"
                                placeholder="Enter Course Description"
                                {...register("courseDesc", { required: true })}
                                className="bg-slate-800 p-2 rounded-md"
                            />
                            {errors.courseDesc && (
                                <span className="text-red-500">Course Description is Required</span>
                            )}
                        </div>

                        {/* Course Price */}
                        {/* <div className="flex flex-col">
                        <label htmlFor="coursePrice">Price <sup className="text-red-500">*</sup></label>
                        <div className="flex items-center bg-slate-800 p-2 rounded-md">
                            <FaRupeeSign />
                            <input
                                type="number"
                                id="coursePrice"
                                placeholder="Enter Course Price"
                                className="bg-slate-800 p-2 rounded-md w-full"
                                {...register("coursePrice", { required: true, valueAsNumber: true })}
                            />
                        </div>
                        {errors.coursePrice && (
                            <span className="text-red-500">Course Price is Required</span>
                        )}
                    </div> */}

                        {/* Course Category */}
                        <div className="flex flex-col">
                            <label htmlFor="courseCategory">Course Category <sup className="text-red-500">*</sup></label>
                            <select
                                id="courseCategory"
                                defaultValue=""
                                className="bg-slate-800 p-2 rounded-md"
                                {...register("courseCategory", { required: true })}
                            >
                                <option value="" disabled>Choose a category</option>
                                {!loading && courseCategory.map((category, index) => (
                                    <option key={index} value={category._id}>{category.name}</option>
                                ))}
                            </select>
                            {errors.courseCategory && (
                                <span className="text-red-500">Please Specify the Category</span>
                            )}
                        </div>

                        {/* Tags */}
                        <div className="flex flex-col">
                            {tagList.length > 0 && (
                                <div className="flex gap-2 flex-wrap">
                                    {tagList.map((tag, index) => (
                                        <p key={index} className="flex items-center text-yellow-500 bg-slate-800 font-semibold p-1 gap-1 rounded-xl">
                                            <span>{tag}</span>
                                            <button type="button" onClick={() => removeTag(index)} className="text-red-500 font-semibold">
                                                <RxCross2 />
                                            </button>
                                        </p>
                                    ))}
                                </div>
                            )}
                            <label htmlFor="courseTag">Tags <sup className="text-red-500">*</sup></label>
                            <input
                                type="text"
                                id="courseTag"
                                placeholder="Add tags"
                                className="bg-slate-800 p-2 rounded-md"
                                value={requirement}
                                onChange={(e) => setRequirement(e.target.value)}
                            />
                            <button
                                className="text-yellow-400 mt-2"
                                type="button"
                                onClick={addTag}
                            >Add</button>
                            {errors.courseTag && (
                                <span className="text-red-500">Please Enter at Least One Tag</span>
                            )}
                        </div>

                        {/* Course Thumbnail */}
                        <div className="flex flex-col">
                            <label htmlFor="courseImage">Course Thumbnail <sup className="text-red-500">*</sup></label>
                            <input
                                type="file"
                                id="courseImage"
                                className="bg-slate-800 p-2 rounded-md"
                                {...register("courseImage", { required: true })}
                                onChange={(e) => {
                                    handleImageChange(e);
                                }}
                            />
                            {errors.courseImage && (
                                <span className="text-red-500">Course Thumbnail is Required</span>
                            )}
                            {imagePreview && (
                                <div>
                                    <p>Image Preview</p>
                                    <img src={imagePreview} className="mt-2 rounded-md w-full h-auto max-h-64 object-cover md:max-h-80" alt="Course Thumbnail Preview" />
                                </div>
                            )}
                        </div>

                        {/* What You Will Learn */}
                        <div className="flex flex-col">
                            <label htmlFor="courseBenifit">What you will Learn <sup className="text-red-500">*</sup></label>
                            <textarea
                                id="courseBenifit"
                                placeholder="Learning from the course"
                                {...register("courseBenifit", { required: true })}
                                className="bg-slate-800 p-2 rounded-md"
                            />
                            {errors.courseBenifit && (
                                <span className="text-red-500">This Field is Required</span>
                            )}
                        </div>

                        {/* Save & Next Button */}
                        <button type="submit" className="bg-yellow-500 font-semibold p-2 rounded-md text-black">
                            Save & Next
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default CourseInformation;
