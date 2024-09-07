import { createSlice } from "@reduxjs/toolkit";
import { TLoading,TUser, isString } from "@types";
import actRegister from "./act/actRegister";
import actLogin from "./act/actLogin";



interface IAuthState{
  accessToken: null | string,
  error: null | string,
  loading:TLoading,
  user:TUser | null,
}

const initialState : IAuthState ={
accessToken: null,
error: null,
loading:"idle",
user:null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers:{
    resetUI:(state)=>{
      state.loading ="idle"
      state.error = null;
    },
    
    authLogout:(state)=>{
      state.accessToken=null;
      state.user=null;
      
    }
  },
  extraReducers:(bulider)=>{
  
    // register
    bulider.addCase(actRegister.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    })
    bulider.addCase(actRegister.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.accessToken = action.payload.token;
      state.user =action.payload.user  ;
    })
    bulider.addCase(actRegister.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    })

      // login
      bulider.addCase(actLogin.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      bulider.addCase(actLogin.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.accessToken = action.payload.token;
        state.user = action.payload.user;
      
  
      })
      bulider.addCase(actLogin.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      })
  },
})

export const{resetUI,authLogout}=authSlice.actions
export default authSlice.reducer;
export{actRegister,actLogin}