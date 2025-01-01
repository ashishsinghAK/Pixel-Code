import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { InstructorCourseDetail } from '../../Service/courseDetailAPI';
import { InstructorData } from '../../Service/profileAPI';
import Spinner from "../Common/Spinner";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, registerables } from "chart.js";
import { Pie, PolarArea } from "react-chartjs-2";

const InstructorDashboard = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [instructorData, setInstructorData] = useState(null);
    const [courseDetail, setCourseDetail] = useState([]);

    useEffect(() => {
        const getInstructorData = async () => {
            setLoading(true);
            const InstructorApiData = await InstructorData(token);
            const result = await InstructorCourseDetail(user._id, token);
            console.log('result of course', result);
            console.log('Instructor data', InstructorApiData);
            if (InstructorApiData) {
                setInstructorData(InstructorApiData);
            }
            if (result) {
                setCourseDetail(result);
            }
            setLoading(false);
        }
        getInstructorData();
    }, [token, user._id]);

    const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmount, 0) || 0;
    const totalStudent = instructorData?.reduce((acc, curr) => acc + curr.totalStudent, 0) || 0;

    // Function to generate random colors
    const getColor = (value) => {
        const colors = [];
        for (let i = 0; i < value; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
            colors.push(color);
        }
        return colors;
    };

    ChartJS.register(...registerables);

    let chartDataIncome = {};
    let chartDataStudent = {};

    if (instructorData) {
        // Create data for displaying chart for student
        chartDataStudent = {
            labels: instructorData.map((course) => course?.courseName),
            datasets: [
                {
                    data: instructorData.map((course) => course?.totalStudent),
                    backgroundColor: getColor(instructorData.length),
                },
            ],
        };

        // Create data for displaying income
        chartDataIncome = {
            labels: instructorData.map((course) => course?.courseName),
            datasets: [
                {
                    data: instructorData.map((course) => course?.totalAmount),
                    backgroundColor: getColor(instructorData.length),
                },
            ],
        };
    }

    const option = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
        },
    };

    const polarOption = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            r: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className='p-5 w-full md:w-[75vw] rounded-3xl bg-slate-950'>
            <div className='text-white text-center flex flex-col gap-10 w-full md:w-[80vw] mx-auto'>
                <p className='flex items-center gap-2 ml-4 md:ml-14'>
                    <span className='font-semibold'>Hi,</span>
                    <span className='text-yellow-500 text-2xl font-semibold'>{user?.firstName}</span>
                </p>

                {loading ? (
                    <div className="flex justify-center">
                        <Spinner />
                    </div>
                ) : (
                    courseDetail.length > 0 && (
                        <div className='flex flex-col gap-5 justify-center'>
                            <p className='text-4xl text-orange-500 font-bold'>Course Data Chart</p>

                            {instructorData.length > 0 ? (
                                <div className='h-[50vh] flex justify-center border mr-4 ml-4 md:mr-[20vw] md:ml-[20vw] border-blue-400 p-5 rounded-2xl'>
                                    <Pie data={chartDataStudent} options={option} />
                                </div>
                            ) : (
                                <div>No Data Found</div>
                            )}

                            <div className='flex flex-col md:flex-row justify-evenly gap-5 w-full'>
                                <div className='flex flex-col gap-3 w-full md:w-[40%]'>
                                    <p className='text-3xl font-bold'>Income Chart</p>
                                    <div className='border p-5 border-blue-400 rounded-2xl'>
                                        <div className='h-[50vh]'>
                                            <PolarArea data={chartDataIncome} options={polarOption} />
                                        </div>
                                    </div>
                                </div>

                                {/* Detail */}
                                <div className='flex flex-col gap-5 w-full md:w-[40%]'>
                                    <h1 className='text-3xl text-blue-600 font-bold'>Statistic:</h1>
                                    <div className='flex flex-col bg-slate-950 p-10 rounded-xl gap-2 border-blue-400 border'>
                                        <span>
                                            <p className='text-slate-400'>Total Courses</p>
                                            <p className='text-3xl'>{courseDetail.length}</p>
                                        </span>
                                        <span>
                                            <p className='text-slate-400'>Total Students</p>
                                            <p className='text-3xl'>{totalStudent}</p>
                                        </span>
                                        <span>
                                            <p className='text-slate-400'>Total Income</p>
                                            <p className='text-3xl'>Rs {totalAmount}</p>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                )}

                <div className='flex justify-center'>
                    <div className='flex flex-col w-full md:w-[60vw] bg-slate-800 rounded-2xl'>
                        <div className='flex justify-between bg-slate-900 p-4'>
                            <h1 className='text-2xl font-semibold'>Your Courses</h1>
                            <button onClick={() => navigate("/dashboard/my-courses")} className='text-orange-500'>
                                View All
                            </button>
                        </div>

                        {/* Courses Card */}
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-5 gap-10'>
                            {courseDetail.length > 0 ? (
                                courseDetail.slice(0, 3).map((course) => (
                                    <div className='flex flex-col border p-5 rounded-lg items-center'>
                                        <img src={course?.thumbNail} className='w-48 h-24 object-cover mb-4' alt="Course Thumbnail" />
                                        <p>Name: {course?.courseName}</p>
                                        <p>Price: Rs {course?.price}</p>
                                    </div>
                                ))
                            ) : (
                                <div>You have not created any course yet</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorDashboard;
