import { createSlice } from "@reduxjs/toolkit";
import { TLoading, TPost, isString } from "@types";
import actGetAllPosts from "./act/actGetALlPosts";
import actGetOnePostById from "./act/actGetOnePostById";
import actCreateComment from "./act/actCreateComment";
import actGetAllOneUserPosts from "./act/actGetAllOneUserPosts";
import AddAndEditePost from "./act/AddAndEditePost";
import DeletePost from "./act/DeletePost";

interface IPostsState{
  error:null | string,
  loading:TLoading,
  posts:TPost[],
  onePostById:TPost | null;
  userPost:TPost[],
}

const initialState:IPostsState={
  error:null,
  loading:"idle",
  posts:[],
  onePostById:null,
  userPost:[]

}
const postSlice = createSlice({
  name:"post",
  initialState,
  reducers:{
    cleanPosts:(state)=>{
      state.error=null,
      state.loading="idle" 
      state.posts=[]
    },
    cleanOnePostById:(state)=>{
      state.error=null,
      state.loading="idle" 
      state.onePostById=null
    },
    cleanOneUserPost:(state)=>{
      state.error=null,
      state.loading="idle" 
      state.userPost=[]
    },
  },
  extraReducers(bulider) {
    //get all posts
    bulider.addCase(actGetAllPosts.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    })
    bulider.addCase(actGetAllPosts.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.posts=action.payload.data;
    

    })
    bulider.addCase(actGetAllPosts.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    })

    //onePostById

    bulider.addCase(actGetOnePostById.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    })
    bulider.addCase(actGetOnePostById.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.onePostById=action.payload;
    

    })
    bulider.addCase(actGetOnePostById.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    })

    //create comments
    bulider.addCase(actCreateComment.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    })
    bulider.addCase(actCreateComment.fulfilled, (state) => {
      state.loading = "succeeded";
    })
    bulider.addCase(actCreateComment.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    })

    //Get All Posts for one user
    bulider.addCase(actGetAllOneUserPosts.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    })
    bulider.addCase(actGetAllOneUserPosts.fulfilled, (state, action) => {
      state.loading = "succeeded";
    
      state.userPost= action.payload;
      

    })
    bulider.addCase(actGetAllOneUserPosts.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    })


      //Add one post
      bulider.addCase(AddAndEditePost.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      bulider.addCase(AddAndEditePost.fulfilled, (state,action) => {
        state.loading = "succeeded";
        state.userPost.unshift(action.payload);
      
  
      })
      bulider.addCase(AddAndEditePost.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      })

      
      //Delete post
      bulider.addCase(DeletePost.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      bulider.addCase(DeletePost.fulfilled, (state) => {
        state.loading = "succeeded";
      
      
  
      })
      bulider.addCase(DeletePost.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      })
    },
  
})
export default postSlice.reducer;
export const {cleanOnePostById,cleanPosts,cleanOneUserPost}= postSlice.actions;
export{actGetAllPosts,actGetOnePostById,actCreateComment,actGetAllOneUserPosts,AddAndEditePost,DeletePost}