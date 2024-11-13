import React, { useEffect } from 'react'
import { useSelector } from "react-redux"
import Sidebar from '../Component/DashComponent/Sidebar';
import MyProfile from '../Component/DashComponent/MyProfile';
import { toast } from "react-hot-toast"
import Setting from '../Component/DashComponent/Setting';
import { Route, Routes } from 'react-router-dom'
import EnrolledCourses from '../Component/DashComponent/EnrolledCourses';
import WishList from '../Component/DashComponent/WishList';

function Dashboard() {

    const { loading: authLoading, token } = useSelector((state) => state.auth);
    const { loading: profileLoading } = useSelector((state) => state.profile);

    useEffect(() => {
        if (!token) {
            toast.error("Not a valid user");
        }
    }, [token]);

    if (profileLoading || authLoading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    if (!token) {
        return (
            <div className='w-screen 
            h-screen flex justify-center items-center text-4xl text-red-500'>
                You are Registered/Logined</div>
        )
    }

    return (
        <div className="text-white flex flex-row">
            <div className="w-[12em]"><Sidebar /></div>
            <div className="flex-1 ml-16 mr-4">
                <Routes>
                    <Route path="/" element={<MyProfile />} />
                    <Route path="/setting" element={<Setting />} />
                    <Route path='/enrolled-courses' element={<EnrolledCourses/>}/>
                    <Route path='/My-Wishlist' element={<WishList/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default Dashboard