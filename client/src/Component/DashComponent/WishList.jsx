import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { IoStarOutline } from "react-icons/io5";
import { MdOutlineDeleteForever } from "react-icons/md";
import ReactStars from "react-rating-stars-component";

function WishList() {
  const { totalItem, cart, removeFromCart } = useSelector((state) => state.cart)
  const dispatch = useDispatch();
  return (
    <div className='text-white'>
      hello
      <h1>My Wishlist</h1>

      {
        totalItem > 0 ? (
          <div>
            {
              cart.map((course, index) => (
                <div>
                  <div>
                    <img src={course?.thumbNail} />
                  </div>

                  <div>
                    <p>{course?.courseName}</p>
                    <p>{course?.category}</p>
                    <div>
                      <span>4.8</span>
                      <ReactStars
                        count={5}
                        size={20}
                        edit={false}
                        activeColor="#ffd700"
                        emptyIcon={<IoStarOutline />}
                        fullIcon={<IoStarOutline />}
                      />
                      <p>{course?.ratingAndReviews.length} Ratings</p>
                    </div>
                  </div>


                  <div>
                    <button onClick={() => dispatch(removeFromCart(course._id))}>
                      <MdOutlineDeleteForever />
                      <span>Remove</span>
                    </button>

                    <p>{course?.price}</p>
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