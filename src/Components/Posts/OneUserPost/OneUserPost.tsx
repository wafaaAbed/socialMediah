import { useAppDispatch, useAppSelector } from '@store/hooks';
import { actGetOnePostById, cleanOnePostById } from '@store/posts/postSlice';
import { TPost } from '@types'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { unknown } from 'zod';
import PostDetails from '../PostDetails/PostDetails';




function OneUserPost() {
const params =useParams();
const dispatch =useAppDispatch();
const {onePostById}= useAppSelector((state)=>state.post)

const idPost = params.id ? params.id : unknown;
useEffect(()=>{
const promies=  dispatch(actGetOnePostById(+idPost))
return () => {
  promies.abort()
  dispatch(cleanOnePostById());
};
},[dispatch])

  return (
    <section className='my-2 border p-3'>
      <h1>Post By: {onePostById.author?.name}</h1>
     {onePostById && 
    <PostDetails id={0} title={''} body={''} image={''} comments_count={0} comments={[]} {...onePostById} />
      
     }
    
    
    </section>
  )
}

export default OneUserPost
