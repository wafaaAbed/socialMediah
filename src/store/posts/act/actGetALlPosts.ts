import { createAsyncThunk } from "@reduxjs/toolkit";
import { TPost } from "@types";
import axios from "axios";

type TResponse = {
posts:TPost[];
};

export const actGetAllPosts = createAsyncThunk(
  "posts/actGetAllPosts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
          const response = await axios.get<TResponse>(
            "https://tarmeezacademy.com/api/v1/posts?limit=5&page=1"
          );
         
          return response.data ;
        } catch (error) {
      
          return rejectWithValue(error);
        }
    }
);
export default actGetAllPosts;