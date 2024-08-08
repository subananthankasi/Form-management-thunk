import { createSlice } from "@reduxjs/toolkit";
import { userDeleteThunk } from "../Thunk/UserDeleteThunk";

const userDeleteSlice = createSlice({
    name:'delete',
    initialState : {
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(userDeleteThunk.pending ,(state,action)=>{
            state.loading = true
        });
        builder.addCase(userDeleteThunk.fulfilled ,(state,action)=>{
            state.data = action.payload
            state.loading = false
        });
        builder.addCase(userDeleteThunk.rejected ,(state,action)=>{
            state.error = action.error
            state.loading = false
        });
    },
});
export const userDeleteReducer = userDeleteSlice.reducer