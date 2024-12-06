import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from "./slice/authSlice";
import profileReducer from "./slice/profileSlice";
import cartReducer from "./slice/cartSlice"
import courseReducer from "./slice/courseSlice";
import viewCourseDetailReducer from "./slice/viewCourseSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    profile:profileReducer,
    cart:cartReducer,
    course:courseReducer,
    viewCourse:viewCourseDetailReducer,
})

export default rootReducer;