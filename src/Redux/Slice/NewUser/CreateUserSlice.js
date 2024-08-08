import { createSlice } from "@reduxjs/toolkit";
import { createUserThunk } from "../../Thunk/NewUser/CreateUserThunk";

const createUserSlice = createSlice({
    name:'create',
    initialState : {
        loading:false,
        data:[],
        error:null
    },
    extraReducers(builder){
        builder.addCase(createUserThunk.pending ,(state)=>{
            state.loading = true
        });
        builder.addCase(createUserThunk.fulfilled ,(state,action)=>{
            state.data = action.payload
            state.loading = false
        });
        builder.addCase(createUserThunk.rejected ,(state,action)=>{
            state.error = action.error
            state.loading = false
        });
    },
});
export const createUserReducer = createUserSlice.reducer