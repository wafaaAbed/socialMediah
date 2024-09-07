import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axiosErrorHandler from "@util/axiosErrorHandler";


import axios from "axios";


export const DeletePost = createAsyncThunk(
  "post/deletePost",
  async (id:number, thunkAPI) => {
    const { rejectWithValue ,getState} = thunkAPI;
    const {auth}= getState() as RootState;
    const accessToken = auth.accessToken;

    const headers={
          "authorization":`Bearer ${accessToken}`
    }
    try {
      const response = await axios.delete(`https://tarmeezacademy.com/api/v1/posts/${id}`,{headers:headers}
              );
      
    
    return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error))    }
  }
);
export default DeletePost;