import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"
import { FaCartPlus } from "react-icons/fa6";
import profileDropdown from '../Auth/profileDropdown';
import { ApiConnector } from "../../Service/ApiConnector";
import { categories } from "../../Service/API";
import { IoIosArrowDropdown } from "react-icons/io";




const NavBar = () => {

  const urls = [
    {
      title: "python",
      link: "/catalog/python"
    },
    {
      title: "Web Dev",
      link: "/catalog/web_dev"
    },

  ]

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { cart } = useSelector((state) => state.cart);
  const [subLink, setSubLink] = useState([])

  // const fetchSubLink = async () => {
  //   try {
  //     const result = await ApiConnector("GET", categories.CATEGORIES_API);
  //     console.log('category detail', result);
  //     setSubLink(result.data.data);
  //   } catch (error) {
  //     console.log('Could not fetch the category detail');

  //   }
  // }


  // useEffect(() => {
  //   fetchSubLink();
  // }, [])

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

            <div className='invisible absolute flex flex-col rounded-md bg-orange-200
            text-slate-900 opacity-0 transition-all duration-200 group-hover:visible 
            group-hover:opacity-100 lg:w-[300px] cursor-pointer left-[50%] top-[50%]
            translate-x-[-50%] translate-y-6 p-1 z-50'>
              <div className='absolute left-[50%] top-0 translate-x-5 translate-y-[-45%]
              h-6 w-6 rotate-45 rounded bg-orange-200'>
              </div>
              {
                urls.length > 0 ? (
                  urls.map((links, index) => (
                    <Link to={`${links.link}`} key={index}>
                      <p>{links.title}</p>
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
          {
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
          }

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
            token !== null && <profileDropdown />
          }

        </div>


      </div>

    </div>
  )
}

export default NavBar