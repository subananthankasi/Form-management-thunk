import { createSlice } from "@reduxjs/toolkit";
import { selectRoleThunk } from "../../Thunk/NewUser/SelectRoleThunk";

const selectRoleSlice = createSlice({
    name:'select',
    initialState : {
        loading:false,
        data:{},
        error:null
    },
    extraReducers(builder){
        builder.addCase(selectRoleThunk.pending ,(state)=>{
            state.loading = true
        });
        builder.addCase(selectRoleThunk.fulfilled ,(state,action)=>{
            state.data = action.payload
            state.loading = false

        });
        builder.addCase(selectRoleThunk.rejected ,(state,action)=>{
            state.error = action.error
            state.loading = false

        });
    },
});
export const selectRoleReducer = selectRoleSlice.reducer