import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { IoStarOutline } from "react-icons/io5";
import { MdOutlineDeleteForever } from "react-icons/md";
import { toast } from "react-hot-toast"
import { removeFromCart } from '../../Reducer/slice/cartSlice';
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { EnrollCourse } from '../../Service/courseDetailAPI';
import { useNavigate } from 'react-router-dom';

function WishList() {
  const { totalItem, cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const removeCart = (courseId) => {
    dispatch(removeFromCart(courseId))
    toast.success("Course Removed")
  }

  const BuyButton = async (courseID) => {
    await EnrollCourse(courseID, token);
    navigate("/dashboard/enrolled-courses")
  }

  return (
    <div className='text-white px-4'>
      <h1 className='text-4xl text-center my-5'>My Wishlist</h1>

      {totalItem > 0 ? (
        <div className='w-full max-w-[90%] mx-auto'>
          {cart.map((course, index) => (
            <div key={index} className='border-t py-4'>
              <div className='flex flex-col md:flex-row justify-between items-center gap-4 p-4 bg-gray-800 rounded-lg shadow-lg'>
                {/* Course Image */}
                <div className='w-full sm:w-[250px]'>
                  <img src={course?.thumbNail} className='w-full h-auto rounded-lg' />
                </div>

                {/* Course Details */}
                <div className='flex-1 flex flex-col gap-2 text-center md:text-left'>
                  <p><span className='text-yellow-500 font-semibold'>Course Name:</span> {course?.courseName}</p>
                  <p><span className='text-yellow-500 font-semibold'>Category:</span> {course?.category?.name}</p>
                  <button 
                    className='flex items-center justify-center md:justify-start gap-2 border-2 border-yellow-500 w-full sm:w-[8em] mt-2 p-2 font-semibold hover:bg-yellow-600 transition-all'
                    onClick={() => BuyButton(course._id)}
                  >
                    Buy Now <FaArrowUpRightFromSquare />
                  </button>
                </div>

                {/* Price and Remove Button */}
                <div className='flex flex-col items-center md:items-end gap-2'>
                  <p className='text-2xl font-semibold text-yellow-500'>Rs {course?.price}</p>
                  <button 
                    onClick={() => removeCart(course._id)}
                    className='text-red-500 border flex items-center gap-1 p-2 hover:bg-red-600 transition-all rounded-md'
                  >
                    <MdOutlineDeleteForever size={20} />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='text-center text-xl mt-10'>Currently No Item in your Wishlist</div>
      )}
    </div>
  )
}

export default WishList
