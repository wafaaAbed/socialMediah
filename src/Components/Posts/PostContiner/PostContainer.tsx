import { TPost } from '@types'
import PostDetails from '../PostDetails/PostDetails'
import { memo } from 'react';


 const PostContainer=memo(({items}:{items:TPost[]}) =>{
  const renderList = items.map((el)=>
    <PostDetails key={el.id} {...el} />
)

  return (
    <>
      {renderList}
    </>
  )
})
export default PostContainer