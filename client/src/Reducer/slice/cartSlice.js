import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast"

const initialState = {
    totalItem: localStorage.getItem("totalItem") ? JSON.parser(localStorage.getItem("totalItem")) : 0,
    cart: localStorage.getItem("cart") ? JSON.parser(localStorage.getItem('cart')) : [],
    total: localStorage.getItem("total") ? JSON.parser(localStorage.getItem('total')) : 0,
}
// cart slice video:7 time 12:32
const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        setTotalItem(state, value) {
            state.totalItem = value.payload;
        },
        addToCart(state, action) {
            const course = action.payload;
            const index = state.cart.findIndex((item) => item._id === course._id);
            if (index >= 0) {
                //means course is already in the cart.
                toast.error('Course already in the cart')
                return
            }

            state.cart.push(course);
            //update the value of totalItem
            state.totalItem++
            state.total += course.price
            localStorage.setItem('cart', JSON.stringify(state.cart))
            localStorage.setItem('total', JSON.stringify(state.total))
            localStorage.setItem('totalItem', JSON.stringify(state.totalItem))
        },
        removeFromCart(state, action) {
            const courseId = action.payload
            const index = state.cart.findIndex((item) => item._id === courseId)
            if (index >= 0) {
                //if course found in the cart then remove it
                state.totalItem--
                state.total -= state.cart[index].price
                state.cart.splice(index, 1)

                localStorage.setItem('cart', JSON.stringify(state.cart))
                localStorage.setItem('total', JSON.stringify(state.total))
                localStorage.setItem('totalItem', JSON.stringify(state.totalItem))
            }
        }
    }
})

export const { setTotalItem, addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;