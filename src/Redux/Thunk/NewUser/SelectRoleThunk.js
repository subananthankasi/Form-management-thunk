import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../Environment/Environment";

const API_URL = baseUrl
export const selectRoleThunk = createAsyncThunk('selectRoleThunk/data',
    async() => {
        const auth_Token = "BslogiKey" + " " + localStorage.getItem("auth_token");
        const response = await axios ({
            method:'Get',
            url:API_URL + 'api/role/get',
            headers: {
                Authorization: auth_Token,
              },
            
        })
        return response.data
    }
)