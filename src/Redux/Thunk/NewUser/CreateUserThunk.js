import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL ='http://101.53.155.156:8089/api/user/create'
export const createUserThunk = createAsyncThunk('LoginThunk/data',
    async ({ fullName, email, phoneNo, address, userName, password, userRoleId }, { rejectWithValue }) => {
        const auth_Token = "BslogiKey" + " " + localStorage.getItem("auth_token");
        try {
            const response = await axios({
                method: 'Post',
                url: API_URL ,
                headers: {
                             Authorization: auth_Token,
                                },
                data: {fullName, email, phoneNo, address, userName, password, userRoleId }

            })
            return response.data
        }
        catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            }
            else {
                return rejectWithValue({ message: 'An unexpected error occurred' });
            }
        }
    }

)

