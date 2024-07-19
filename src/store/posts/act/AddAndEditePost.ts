import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";

import axios from "axios";


type TpostInfo = {
  message: string;
  title: string;
  image: File;
  type: "put" | "edit";
  id?:number
};

export const AddAndEditePost = createAsyncThunk(
  "post/AddAndEditePost",
  async (postInfo: TpostInfo, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    const accessToken = auth.accessToken;
    const { message, title, image, type,id } = postInfo;

    const formData = new FormData();

    formData.append("body", message);
    formData.append("title", title);
    formData.append("image", image);

    const headers = {
      "Content-Type": "multipart/form-data",
      "authorization": `Bearer ${accessToken}`,
    };
    if (type === "put") {
    
      try {
        const response = await axios.post(
          "https://tarmeezacademy.com/api/v1/posts",
          formData,
          { headers: headers }
        );

        return response.data;
      } catch (error) {
        console.log(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      }
    } else {
      formData.append("_method","put");
  
      try {
        const response = await axios.post(
          `https://tarmeezacademy.com/api/v1/posts/${id}`,
          formData,
          { headers: headers }
        );
      
        return response.data;
      } catch (error) {
        console.log(error.response.data.message)
        return rejectWithValue(error.response.data.message);
      }
    }
  }
);

export default AddAndEditePost;
