import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../Environment/Environment";
import axios from "axios";

const API_URL= baseUrl
export const userDetailsThunk = createAsyncThunk('userDetailsThunk/data',
    async() => {
        const auth_Token = "BslogiKey" +" "+localStorage.getItem("auth_token");
        const response = await axios ({
            method:'GET',
            url:API_URL + 'api/user/get',
            headers: {
                Authorization: auth_Token,
              },
        })
        return response.data
    }
)


