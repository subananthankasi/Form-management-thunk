import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL= 'http://101.53.155.156:8089/api/user/get/'
export const updateGetThunk = createAsyncThunk('updateGetThunk/data',
    async(item) => {
        const auth_Token = "BslogiKey" + " " + localStorage.getItem("auth_token");
        const response = await axios ({
            method:'Get',
            url:API_URL + item.id,
            headers: {
                Authorization: auth_Token,
              }, 
        })
        return response.data
    }
)