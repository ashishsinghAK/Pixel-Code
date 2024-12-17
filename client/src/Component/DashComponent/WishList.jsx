import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { IoStarOutline } from "react-icons/io5";
import { MdOutlineDeleteForever } from "react-icons/md";
import { toast } from "react-hot-toast"
import { removeFromCart } from '../../Reducer/slice/cartSlice';

function WishList() {
  const { totalItem, cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch();

  const removeCart = (courseId) => {
    dispatch(removeFromCart(courseId))
    toast.success("Course Removed")
  }

  return (
    <div className='text-white'>

      <h1 className='text-4xl m-5'>My Wishlist</h1>

      {
        totalItem > 0 ? (
          <div className='w-[60vw] '>
            {
              cart.map((course, index) => (
                <div className='border-t'>
                  <div className='flex justify-around m-5'>
                    <div className='flex gap-2'>
                      <div>
                        <img src={course?.thumbNail} className='w-[250px]' />
                      </div>

                      <div>
                        <p><span className='text-yellow-500 font-semibold'>Course Name:</span> {course?.courseName}</p>
                        <p><span className='text-yellow-500 font-semibold'>Category:</span> {course?.category?.name}</p>
                      </div>
                    </div>


                    <div>
                      <button onClick={() => removeCart(course._id)}
                        className='text-red-500 border flex p-2 items-center'>
                        <MdOutlineDeleteForever />
                        <span>Remove</span>
                      </button>

                      <p className='text-2xl font-semibold text-yellow-500'>Rs {course?.price}</p>
                    </div>


                  </div>
                </div>
              ))
            }
          </div>)
          :
          (<div>Currently No Item in your Wishlist</div>)
      }

    </div>
  )
}

export default WishList