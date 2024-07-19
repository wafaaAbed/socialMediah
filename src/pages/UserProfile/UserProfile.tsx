import { useAppDispatch, useAppSelector } from "@store/hooks";
import style from "./style.module.css"
import { useEffect } from "react";
import { actGetAllOneUserPosts, cleanOneUserPost } from "@store/posts/postSlice";
import { PostDetails } from "@Components/Posts";
import personalImage from "@assets/person.png"
import Loading from "@Components/feedback/Loading/Loading";
import { useParams } from "react-router-dom";

const { profileContainer, shape, content, userInfo, userNumber } = style;


function UserProfile() {
  // const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const params = useParams()
  const { userPost, loading, error } = useAppSelector((state) => state.post)
    const userPosts = [...userPost].reverse();
    const zz = userPosts.map((el)=>el.author)
    const userInformation = zz[0];
  useEffect(() => {
    const promies=  dispatch(actGetAllOneUserPosts(params.id))
        return () => {
      promies.abort()
      dispatch(cleanOneUserPost());
    };
  }, [dispatch])



  return (

    <main>
      <Loading status={loading} error={error}>
        <div className={profileContainer}>
          <div className={shape}>
            <img src={(userInformation?.profile_image !== null) ? (userInformation?.profile_image) : personalImage } alt="" />
            <span>Profile Image</span>
          </div>
          <div className={content}>
            <ul className={userInfo}>
              <li>Name: <span>{userInformation?.name}</span> </li>
              <li>User Name: <span>{userInformation?.username}</span> </li>
              <li>Email: <span> {userInformation?.email}</span></li>
            </ul>

            <div className={userNumber}>
              <div><span className="text-center">({userPost.length}) <p>Post</p> </span></div>
            </div>

          </div>

        </div>
        <hr />

        <h2 className="text-decoration-underline my-4">All {userInformation?.username} Posts</h2>
        {userPosts.length > 0
          ? (
            userPosts.map((el) => (
              <PostDetails key={el.id} {...el} isConmment={false}/>
            )
            )
          ) :
          <p>There is no posts yet</p>

        }

      </Loading>
    </main>

  )
}

export default UserProfile
