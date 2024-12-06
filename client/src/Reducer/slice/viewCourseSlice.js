import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseSelectionData: [],
    courseEntireData: [],
    completedLectures: [],
    totalNoLectures: []
}

const viewCourseSlice = createSlice({
    name: "viewCourse",
    initialState,
    reducers: {
        setCourseSelectionData: (state, action) => {
            state.courseSelectionData = action.payload
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

export const { setCourseSelectionData,
    setCourseEntireData, setCompletedLectures, setTotalNoLectures, updateCompletedLectures
} = viewCourseSlice.actions;
export default viewCourseSlice.reducer