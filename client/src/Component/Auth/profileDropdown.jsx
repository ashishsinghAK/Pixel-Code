import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Dropdown } from "flowbite-react"
import { useNavigate, Link } from 'react-router-dom';


const ProfileDropdown = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();


  return (
    <div>
      {
        user && (
          <>
            <Dropdown
              inline
              label={
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
                </div>
              }
              className='bg-slate-800'>
              <Dropdown.Header className='font-semibold'>
                <span className='block'>@{user.firstName}</span>
                <span className='block'>@{user.email}</span>
              </Dropdown.Header>
              <Dropdown.Divider />
              <Dropdown.Item className='border' onClick={() => navigate("/dashboard")}>
                Dashboard
              </Dropdown.Item>
            </Dropdown>
          </>
        )
      }
    </div>
  )
};

export default ProfileDropdown;
