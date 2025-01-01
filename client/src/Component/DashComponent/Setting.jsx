import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteProfile, UpdateDetail } from '../../Service/authAPI';
import { useNavigate } from 'react-router-dom';

function Setting() {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();



    const [formData, setFormData] = useState({
        dateOfBirth: user?.dob || '',
        about: user?.about || '',
        contactNumber: user?.contact || '',
        gender: user?.gender?.toLowerCase() || ''
    });



    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.id]: event.target.value });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(UpdateDetail(formData.dateOfBirth, formData.about, formData.contactNumber, formData.gender, token, navigate));
    };

    const deleteHandler = () => {
        dispatch(DeleteProfile(token, navigate));
    };

    return (
        <div className='text-white flex justify-center'>
            <div className='flex flex-col justify-center items-center p-10 gap-10'>
                {/* Profile Information Section */}
                <section className="flex flex-col gap-10 w-[60vw] border-2 p-16 rounded-lg">
                    <h1 className='text-3xl text-yellow-500'>Profile Information</h1>

                    <div className='flex flex-col md:flex-row gap-5 text-xl'>
                        <div className='flex w-full'>
                            <span className='font-mono'>Name:</span>
                            <span className='text-red-500'>{user.firstName + " " + user.lastName}</span>
                        </div>
                    </div>

                    <form onSubmit={submitHandler} className='flex flex-col gap-5'>
                        <div className='flex flex-col md:flex-row gap-5'>
                            <div className='flex flex-col w-full md:w-1/2'>
                                <label htmlFor="dateOfBirth">DOB</label>
                                <input
                                    type="date"
                                    id="dateOfBirth"
                                    className='btn bg-slate-800 p-2 rounded-md'
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="gender">Gender</label>
                                <select
                                    id="gender"
                                    className='bg-slate-800 p-2 rounded-md'
                                    value={formData.gender}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="contactNumber">Contact</label>
                                <input
                                    type="tel"
                                    id="contactNumber"
                                    className='bg-slate-800 p-2 rounded-md'
                                    placeholder='Contact'
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="about">About</label>
                            <textarea
                                id="about"
                                className='bg-slate-800 rounded-md p-2'
                                placeholder='Write...'
                                value={formData.about}
                                onChange={handleChange}
                            />
                        </div>

                        <button type='submit' className='font-bold rounded-md w-[4em] bg-yellow-500 text-black p-2'>
                            Save
                        </button>
                    </form>
                </section>

                {/* Delete Account Section */}
                {
                   user &&  user?.accountType === "Student" && (
                        <div className='bg-slate-800 p-10 flex flex-col gap-5 rounded-xl'>
                            <button
                                className='text-black p-3 rounded-md bg-red-600 font-bold w-fit'
                                onClick={deleteHandler}
                            >
                                Delete Account
                            </button>
                            <div className='text-yellow-400 font-semibold text-[1em]'>
                                <p>Would you like to delete your account?</p>
                                <p>
                                    This account may contain paid courses. Deleting the account will permanently
                                    delete your courses and related information.
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Setting;
