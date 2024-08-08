import { createSlice } from "@reduxjs/toolkit";
import { userDetailsThunk } from "../Thunk/UserDetailsThunk";

const userDetailsSlice = createSlice({
    name:'get',
    initialState : {
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(userDetailsThunk.pending ,(state,action)=>{
            state.loading = true
        });
        builder.addCase(userDetailsThunk.fulfilled ,(state,action)=>{
            state.data = action.payload
            state.loading = false
        });
        builder.addCase(userDetailsThunk.rejected ,(state,action)=>{
            state.error = action.error
            state.loading = false
        });
    },
});
export const userDetailsReducer = userDetailsSlice.reducer