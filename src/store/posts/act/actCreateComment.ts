import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";

import axios from "axios";

type TCommentinfo={
  comment :string
  id:number
}



export const actCreateComment = createAsyncThunk(
  "posts/actCreateComment",
  async (commentinfo:TCommentinfo, thunkAPI) => {
    const { rejectWithValue ,getState} = thunkAPI;
    const {auth}= getState() as RootState;
    const accessToken = auth.accessToken;
    const {comment,id} = commentinfo;
    const params ={
      "body": comment
    }
    console.log(comment)
    
    try {
          const response = await axios.post(
            `https://tarmeezacademy.com/api/v1/posts/${id}/comments`,params,{
              headers:{
                "authorization":`Bearer ${accessToken}`
              }
            }
          )
        
  
          return response.data;
          
        } catch (error) {
          console.log("no send response")
          return rejectWithValue(error);
        }
    }
);
export default actCreateComment