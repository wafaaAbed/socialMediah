import { TUser } from "@types";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";

const{userInfo,userImage}=style;
 type TUserInfo = {
  user:TUser[],
 }



function UserInfo({user}:TUserInfo ) {
const navigate = useNavigate()
  return (
    <div className={userInfo}  onClick={()=> {
      navigate(`profile/${user.name}/${user.id}`)
    }}
     >
    <><h4>{user.username}</h4><div className={userImage}>
      <img src={user.profile_image} alt={user.username} />
    </div></>
  </div>
  )
}

export default UserInfo
