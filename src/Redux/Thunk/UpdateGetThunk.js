import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL= 'http://101.53.155.156:8089/api/user/update'
export const updateThunk = createAsyncThunk('updateThunk/data',
    async(payload) => {
        console.log('payload',payload)
        const auth_Token = "BslogiKey" + " " + localStorage.getItem("auth_token");
        const response = await axios ({
            method:'put',
            url: API_URL,
            headers: {
                Authorization: auth_Token,
              }, 
              data:payload
        })
        return response.data
    }
)