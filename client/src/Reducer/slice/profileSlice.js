import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    loading:false,
    detail:localStorage.getItem('detail') ? JSON.parse(localStorage.getItem('detail')) : null,
}

const profileSlice = createSlice({
    name:"profile", 
    initialState:initialState,
    reducers:{
        setUser(state,value){
            state.user = value.payload;
        },
        setLoading(state,value){
            state.loading=value.payload
        },
        setDetail(state,value){
            state.detail=value.payload
        }
    }
})

export const {setUser,setLoading,setDetail} = profileSlice.actions;
export default profileSlice.reducer;