import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { FaCartPlus } from "react-icons/fa6";
import ProfileDropdown from "../Auth/ProfileDropdown"
import { IoIosArrowDropdown } from "react-icons/io";
import { logout } from '../../Service/authAPI';
import { getCourseCategory } from '../../Service/courseDetailAPI';




const NavBar = () => {

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { cart } = useSelector((state) => state.cart);
  const [subLink, setSubLink] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleButton = (e) => {
    dispatch(logout(navigate))
  }

  const fetchSubLink = async () => {
    try {
      const result = await getCourseCategory();
      if (result) {
        setSubLink(result);
      }
    } catch (error) {
      console.log(error.message);
    }
  }


  useEffect(() => {
    fetchSubLink();
  }, [])

  return (
    <div className='h-14  bg-slate-900 flex flex-row items-center justify-center'>

      <div className='flex flex-row w-11/12 text-white items-center justify-evenly font-semibold'>
        {/* logo section */}
        <Link to="/">
          Logo
        </Link>

        {/* link section */}
        <div className='flex justify-evenly gap-12'>

          <Link to="/" className='text-yellow-500'>Home</Link>
          <div className='flex flex-row gap-1 items-center justify-center relative group'>
            <Link>Catalog</Link>
            <span><IoIosArrowDropdown /></span>
            <div className='invisible absolute flex flex-col rounded-md bg-white
            text-slate-900 opacity-0 transition-all duration-200 group-hover:visible 
            group-hover:opacity-100 lg:w-[300px] cursor-pointer left-[50%] top-[50%]
            translate-x-[-50%] translate-y-6 p-1 z-50'>
              {
                subLink.length > 0 ? (
                  subLink.map((links, index) => (
                    <Link to={`catalog/${links.name.split(" ").join("-").toLowerCase()}`} key={index}>
                      <p className='hover:bg-yellow-400 p-1'>{links.name}</p>
                    </Link>
                  ))
                ) : (<div>No Category Added</div>)
              }
            </div>

          </div>
          <Link to="/about">About us</Link>
          <Link to="/contact">Contact us</Link>

        </div>

        {/* signin and signup section */}

        <div className='flex gap-4 items-center'>
          {/* {
            user && user?.accountType != "Instructor" && (
              <Link to="/dashboard/cart" className='relative'>
                <FaCartPlus />
                {
                  totalItem > 0 && (
                    <span>{totalItem}</span>
                  )
                }
              </Link>
            )
          } */}

          {
            token === null && (
              <button className=' p-2 rounded-lg bg-slate-800'>
                <Link to="/login" >Login</Link>
              </button>
            )
          }

          {
            token === null && (
              <button className=' p-2 rounded-lg bg-slate-800'>
                <Link to="/signup">Signup</Link>
              </button>
            )
          }

          {
            token && (<>
              <ProfileDropdown />
              <button onClick={handleButton} className='border p-2 rounded-md'>
                Logout
              </button>
            </>)
          }

        </div>


      </div>

    </div>
  )
}

export default NavBar;