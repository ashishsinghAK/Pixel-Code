import React from 'react'
import {useSelector} from "react-redux"
import Sidebar from '../Component/DashComponent/Sidebar';
function Dashboard() {

    const {loading:authLoading} = useSelector((state) => state.auth);
    const {loading:profileLoading} =  useSelector((state) => state.profile);

    if(profileLoading || authLoading){
        return (
            <div>
                Loading...
            </div>
        )
    }

  return (
    <div className='text-white flex w-[15em]'>
        <Sidebar/>
    </div>
  )
}

export default Dashboard