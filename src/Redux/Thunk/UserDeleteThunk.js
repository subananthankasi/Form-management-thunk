import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL= 'http://101.53.155.156:8089/api/user/delete/'

export const userDeleteThunk = createAsyncThunk('userDeleteThunk/data',
    async(id) => {
        console.log('thunk id',id)
        const auth_Token = "BslogiKey" + " " + localStorage.getItem("auth_token");
        const response = await axios ({
            method:'delete',
            url:API_URL + id,
            headers: {
                Authorization: auth_Token,
              },
        })
        return response.data
    }
)