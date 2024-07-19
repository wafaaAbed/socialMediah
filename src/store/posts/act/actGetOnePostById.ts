import { createAsyncThunk } from "@reduxjs/toolkit";
import { TPost } from "@types";
import axios from "axios";

type TResponse = {
posts:TPost[];
};




export const actGetOnePostById = createAsyncThunk(
  "posts/actGetOnePostById",
  async (id:number, thunkAPI) => {
    const { rejectWithValue ,signal} = thunkAPI;
    try {
          const response = await axios.get<TResponse>(
            `https://tarmeezacademy.com/api/v1/posts/${id}`,{signal}
          );
        
          return response.data.data;
          
        } catch (error) {
          return rejectWithValue(error);
        }
    }
);
export default actGetOnePostById;