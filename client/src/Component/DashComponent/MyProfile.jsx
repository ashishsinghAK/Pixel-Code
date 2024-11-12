import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const MyProfile = () => {
    const { user,detail } = useSelector((state) => state.profile)
    const navigate = useNavigate()

    return (
        <div className='text-white flex flex-col gap-10 p-5'>
            <h1 className='text-3xl sm:text-4xl font-bold text-blue-500 font-mono'>My Profile</h1>
            <div className='flex flex-col gap-5'>

                <div className='flex flex-col sm:flex-row items-center gap-5 bg-yellow-500 w-full sm:w-[60vw] p-5 rounded-xl text-black font-bold'>
                    <img src={user?.image} alt={`profile-${user?.firstName}`} 
                        className='aspect-square w-[78px] sm:w-[100px] rounded-full object-cover' />
                    <div className='flex flex-col text-center sm:text-left'>
                        <p className='flex flex-col sm:flex-row gap-1'>
                            <span>{user?.firstName} </span>
                            <span>{user?.lastName}</span>
                        </p>
                        <p>{user?.email}</p>
                    </div>
                </div>

                <div className='flex flex-col sm:flex-row justify-between items-center p-5 bg-yellow-500 rounded-xl text-black font-bold
                w-full sm:w-[60vw]'>
                    <div className='flex flex-col text-center sm:text-left'>
                        <p>About</p>
                        <p className='text-slate-700'>{detail?.about ?? "Write Something about yourself..."}</p>
                    </div>
                    <button className='bg-slate-600 rounded-md p-2 text-white mt-4 sm:mt-0 w-[4em]'
                        onClick={() => { navigate("/dashboard/setting") }}>
                        Edit
                    </button>
                </div>

                <div className='flex flex-col gap-5 bg-yellow-500 rounded-xl text-black font-bold p-5 w-full sm:w-[60vw]'>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-xl sm:text-2xl'>Personal Details:</h1>
                        <button className='bg-slate-600 rounded-md p-3 text-white w-[4em]'
                            onClick={() => { navigate("/dashboard/setting") }}>
                            Edit
                        </button>
                    </div>
                    <div className='flex flex-col sm:flex-row justify-between w-full sm:w-[45vw] gap-3'>
                        <div className='flex flex-col sm:flex-row'>
                            <p className='text-red-800'>First Name: </p>
                            <span className='ml-1'>{user?.firstName}</span>
                        </div>
                        <div className='flex flex-col sm:flex-row'>
                            <p className='text-red-800'>Last Name: </p>
                            <span className='ml-1'>{user?.lastName}</span>
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row justify-between w-full sm:w-[45vw] gap-3'>
                        <div className='flex flex-col sm:flex-row'>
                            <p className='text-red-800'>Email: </p>
                            <span className='ml-1'>{user?.email}</span>
                        </div>
                        <div className='flex flex-col sm:flex-row'>
                            <p className='text-red-800'>DOB: </p>
                            <span className='ml-1'>{detail?.dateOfBirth ?? "dob"}</span>
                        </div>
                        <div className='flex flex-col sm:flex-row'>
                            <p className='text-red-800'>Contact: </p>
                            <span className='ml-1'>{detail?.contactNumber ?? "contact number"}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile
