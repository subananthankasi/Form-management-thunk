import { createSlice } from "@reduxjs/toolkit";
import {  updateThunk } from "../Thunk/UpdateGetThunk";

const updateSlice = createSlice({
    name:'update',
    initialState : {
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(updateThunk.pending ,(state,action)=>{
            state.loading = true
        });
        builder.addCase(updateThunk.fulfilled ,(state,action)=>{
            state.data = action.payload
            state.loading = false

        });
        builder.addCase(updateThunk.rejected ,(state,action)=>{
            state.error = action.error
            state.loading = false

        });
    },
});
export const updateReducer = updateSlice.reducer