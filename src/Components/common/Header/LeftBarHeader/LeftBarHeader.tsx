import Logout from "@Components/common/Logout/Logout"
import Login from "@pages/Login/Login"
import Register from "@pages/Register/Register"
import UserInfo from "../userInfo/UserInfo"
import { TUser } from "@types"

type TLeftBarHeaderprops={
  accessToken :string | null,
  user:TUser[],
}


function LeftBarHeader({ accessToken,user}:TLeftBarHeaderprops) {

  return (
    <>
      {!accessToken ? <><Login /><Register /></> :
       <>
       <UserInfo user={user}/>
       <Logout />
       </>
       
       }


    </>
  )
}

export default LeftBarHeader
