
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TUser } from "@types";
import axios from "axios";

type TFormData={
  userName:string,
  password:string,
  }

  type TResponse = {
    user: TUser[],
    accessToken: string;
  };

export const actLogin = createAsyncThunk(
  "login/actLogin",
  async (userInfo:TFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const { userName, password } = userInfo;

    try {
      const response = await axios.post<TResponse>(
        "https://tarmeezacademy.com/api/v1/login",
        {
          username: userName,
          password: password,
        }
      );
    console.log(response.data)

      return response.data;
    } catch (error ) {
      return rejectWithValue(error.response.data.message );
    }
  }
);
export default actLogin;