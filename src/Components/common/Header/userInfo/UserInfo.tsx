import { TUser } from "@types";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";

const{userInfo,userImage}=style;


function UserInfo({id,name,username,profile_image}:TUser ) {

const navigate = useNavigate()
  return (
    <div className={userInfo}  onClick={()=> {
      navigate(`profile/${name}/${id}`)
    }}
     >
    <><h4>{username}</h4><div className={userImage}>
      <img src={profile_image} alt={username} />
    </div></>
  </div>
  )
}

export default UserInfo
