import React, { useState } from 'react';
import { sidebarLinks } from '../../Data/dashboard-link';
import { useDispatch, useSelector } from "react-redux";
import SideBarLink from './SideBarLink';
import { FaArrowRight, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { logout } from "../../Service/authAPI";
import Modal from '../Common/Modal';

function Sidebar() {
  const { user, loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading, token } = useSelector((state) => state.auth);

  const [selectedLink, setSelectedLink] = useState(sidebarLinks[0]?.id || null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (profileLoading || authLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  if (!token) {
    return (
      <div className='flex justify-center h-screen w-screen items-center'>
        <h1 className='text-center text-4xl'>
          You are not Registered/Logined.
        </h1>
      </div>
    );
  }

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  return (
    <div className='relative'>
      
      <button 
        className='lg:hidden text-white p-4'
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

     
      <div className={`fixed  h-full transition-transform duration-300 bg-slate-900 p-5
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 lg:w-60 w-[75%] sm:w-[50%] z-20`}>
        
        <div className='flex flex-col gap-5 font-bold h-full'>
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null;

            const isActive = selectedLink === link.id;
            return (
              <div key={link.id} onClick={() => setSelectedLink(link.id)}
                   className={`${isActive ? "text-yellow-500" : "bg-slate-900"} cursor-pointer`}>
                <SideBarLink link={link} iconName={link.icon} />
              </div>
            );
          })}

          <hr className='border-gray-700 my-4' />

          <div className='flex justify-center gap-2 items-center'>
            <button 
              onClick={() => setModalData({
                text1: "Are you sure?",
                text2: "You will be logged out",
                btn1: "Logout",
                btn2: "Cancel",
                btn1Handler: handleLogout,
                btn2Handler: () => setModalData(null)
              })}
              className='text-white'
            >
              Logout
            </button>
            <FaArrowRight className='text-white' />
          </div>
        </div>
      </div>

     
      {modalData && <Modal data={modalData} />}

      
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-10"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default Sidebar;
