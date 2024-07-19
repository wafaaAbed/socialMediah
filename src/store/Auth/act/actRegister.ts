import { createAsyncThunk } from "@reduxjs/toolkit";
import { TUser } from "@types";
import axios from "axios";


    type TFormData={
      userImage: File,
      userName:string,
      password:string,
      email:string,
      name:string,
      }

      type TResponse = {
        user: TUser[],
        accessToken: string;
      };


export const actRegister = createAsyncThunk(
  "registe/registerNewUser",
  async (userInput:TFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
  const {email, password,userImage,userName,name}=userInput;
    const formData = new FormData();
  
    formData.append("username",userName);
    formData.append("password",password);
    formData.append("email",email);
    formData.append("name",name);
    formData.append("image",userImage);
  
    const headers={
      "Content-Type":"multipart/form-data",
  }
    try {
      const response = await axios.post<TResponse>(
        "https://tarmeezacademy.com/api/v1/register",formData,{headers:headers}
              );
      console.log(response.data)
      return response.data;
    }catch (error) {
  
      return rejectWithValue(error.response.data.message )
    }
  }
);
export default actRegister;