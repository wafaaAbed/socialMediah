import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@util/axiosErrorHandler";
import axios from "axios";


export const actGetAllOneUserPosts = createAsyncThunk(
  "posts/actGetAllOneUserPosts",
  async (id:number, thunkAPI) => {
    const { rejectWithValue ,signal} = thunkAPI;
  

    try {
          const response = await axios.get(
            `https://tarmeezacademy.com/api/v1/users/${id}/posts`,{signal}
          );
  
          return response.data.data;
        } catch (error) {
          return rejectWithValue(axiosErrorHandler(error))
        }
  

  }
);
export default actGetAllOneUserPosts;