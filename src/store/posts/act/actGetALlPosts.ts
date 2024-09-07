import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@util/axiosErrorHandler";
import axios from "axios";



export const actGetAllPosts = createAsyncThunk(
  "posts/actGetAllPosts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
          const response = await axios.get(
            "https://tarmeezacademy.com/api/v1/posts?limit=5&page=1"
          );
         
          return response.data ;
        } catch (error) {
          return rejectWithValue(axiosErrorHandler(error))
        }
    }
);
export default actGetAllPosts;