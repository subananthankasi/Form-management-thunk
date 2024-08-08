import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../Environment/Environment";
import axios from "axios";

const API_URL = baseUrl
export const LoginThunk = createAsyncThunk('LoginThunk/data',
    async ({ userName, password }, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: 'Post',
                url: API_URL + 'auth/login',
                data: { userName, password }

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

