import { createSlice } from "@reduxjs/toolkit";
import { updateGetThunk } from "../Thunk/UpdateThunk";


const updateGetSlice = createSlice({
    name:'updateGet',
    initialState : {
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(updateGetThunk.pending ,(state)=>{
            state.loading = true
        });
        builder.addCase(updateGetThunk.fulfilled ,(state,action)=>{
            state.data = action.payload
            state.loading = false

        });
        builder.addCase(updateGetThunk.rejected ,(state,action)=>{
            state.error = action.error
            state.loading = false

        });
    },
});
export const updateGetReducer = updateGetSlice.reducer