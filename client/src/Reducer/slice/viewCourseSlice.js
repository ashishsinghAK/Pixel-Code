import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseSectionData: [],
    courseEntireData: [],
    completedLectures: [],
    totalNoLectures: []
}

const viewCourseSlice = createSlice({
    name: "viewCourse",
    initialState,
    reducers: {
        setCourseSectionData: (state, action) => {
            state.courseSectionData = action.payload
        },
        setCourseEntireData: (state, action) => {
            state.courseEntireData = action.payload
        },
        setCompletedLectures: (state, action) => {
            state.completedLectures = action.payload
        },
        setTotalNoLectures: (state, action) => {
            state.totalNoLectures = action.payload
        },
        updateCompletedLectures: (state, action) => {
            state.completedLectures = [...state.completedLectures,...action.payload]
        }
    }
})

export const { setCourseSectionData,
    setCourseEntireData, setCompletedLectures, setTotalNoLectures, updateCompletedLectures
} = viewCourseSlice.actions;
export default viewCourseSlice.reducer