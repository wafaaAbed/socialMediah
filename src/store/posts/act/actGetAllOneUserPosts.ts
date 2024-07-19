import { createAsyncThunk } from "@reduxjs/toolkit";
import { TPost } from "@types";
import axios from "axios";
type TResponse = {
  
  posts:TPost[];
  };

export const actGetAllOneUserPosts = createAsyncThunk(
  "posts/actGetAllOneUserPosts",
  async (id:number, thunkAPI) => {
    const { rejectWithValue ,signal} = thunkAPI;
  

    try {
          const response = await axios.get<TResponse>(
            `https://tarmeezacademy.com/api/v1/users/${id}/posts`,{signal}
          );
  
          return response.data.data;
        } catch (error) {
          console.log("no posts")
          return rejectWithValue(error);
        }
  

  }
);
export default actGetAllOneUserPosts;