import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";


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
      console.log(error.response.data.message)
      return rejectWithValue(error.response.data.message);
    }
  }
);
export default DeletePost;