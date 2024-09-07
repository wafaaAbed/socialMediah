
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@util/axiosErrorHandler";
import axios from "axios";

type TFormData={
  userName:string,
  password:string,
  }



export const actLogin = createAsyncThunk(
  "login/actLogin",
  async (userInfo:TFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const { userName, password } = userInfo;

    try {
      const response = await axios.post(
        "https://tarmeezacademy.com/api/v1/login",
        {
          username: userName,
          password: password,
        }
      );
    console.log(response.data)

      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error))
    }
  
  }
);
export default actLogin;