import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CategoryDetail } from '../Service/categoryAPI';
import { getCourseCategory } from '../Service/courseDetailAPI';
import { FaRupeeSign } from 'react-icons/fa';

const Catalog = () => {
    const { catalogName } = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryID, setCategoryID] = useState(null);

    // Fetch all course-related categories
    useEffect(() => {
        const getCategory = async () => {
            const result = await getCourseCategory();
            const categoryId = result?.filter((category) =>
                category.name.split(" ").join("-").toLowerCase() === catalogName
            )[0]._id;
            setCategoryID(categoryId);
        };
        getCategory();
    }, [catalogName]);

    useEffect(() => {
        if (!categoryID) return;
        const categoryData = async () => {
            console.log('category', categoryID);
            const result = await CategoryDetail(categoryID);
            setCatalogPageData(result);
        };
        categoryData();
    }, [categoryID]);

    return (
        <div className="text-white flex flex-col">
            {/* Header Section */}
            <div className="flex flex-col gap-4 bg-slate-800 p-8">
                <p>
                    Home | Catalog |{' '}
                    <span className="text-yellow-400">
                        {catalogPageData && catalogPageData?.result?.name}
                    </span>
                </p>
                <h1 className="text-3xl">
                    {catalogPageData && catalogPageData?.result?.name}
                </h1>
                <p>{catalogPageData && catalogPageData?.result?.description}</p>
            </div>

            {/* Section 1: Courses */}
            <div className="m-8">
                <h2 className="text-3xl mb-4">Courses to Get You Started</h2>
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {catalogPageData && catalogPageData?.result?.courses.length > 0 ? (
                        catalogPageData.result.courses.map((course) => (
                            <div
                                className="flex flex-col gap-4 border p-4 rounded-lg shadow-lg"
                                key={course._id}
                            >
                                <img
                                    src={course?.thumbNail}
                                    alt={course?.courseName}
                                    className="h-[180px] w-full object-cover rounded-lg"
                                />
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-red-400">Course Name:</span>
                                        {course?.courseName}
                                    </div>
                                    <p>
                                        <span className="text-red-400">Description: </span>
                                        {course?.courseDescription}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="text-red-400">Price: </span>
                                        <FaRupeeSign />
                                        {course?.price}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center">
                            No Courses found in{' '}
                            <span className="text-yellow-400">
                                {catalogPageData?.result?.name}
                            </span>{' '}
                            category.
                        </div>
                    )}
                </div>
            </div>

            <hr />

            {/* Section 2: Other Courses */}
            <div className="m-8">
                <h2 className="text-3xl mb-4">Other Courses</h2>
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {catalogPageData && catalogPageData.differentCategory.length > 0 ? (
                        catalogPageData.differentCategory.flatMap((category) =>
                            category.courses.map((course) => (
                                <div
                                    className="flex flex-col gap-4 border p-4 rounded-lg shadow-lg"
                                    key={course._id}
                                >
                                    <img
                                        src={course.thumbNail}
                                        alt={course.courseName}
                                        className="h-[180px] w-full object-cover rounded-lg"
                                    />
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-red-400">Course Name:</span>
                                            {course?.courseName}
                                        </div>
                                        <p>
                                            <span className="text-red-400">Description: </span>
                                            {course?.courseDescription}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span className="text-red-400">Price: </span>
                                            <FaRupeeSign />
                                            {course?.price}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )
                    ) : (
                        <div className="col-span-full text-center">No Other Courses...</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Catalog;
