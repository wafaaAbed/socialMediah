import Logout from "@Components/common/Logout/Logout"
import Login from "@pages/Login/Login"
import Register from "@pages/Register/Register"
import UserInfo from "../userInfo/UserInfo"
import { TUser } from "@types"

type TLeftBarHeaderprops = {
  accessToken: string | null,
  user: TUser | null,
}


function LeftBarHeader({ accessToken, user }: TLeftBarHeaderprops) {
  return (
    <>
      {accessToken && user ?
        <>
          <UserInfo  {...user} />
          <Logout /></>
        :


        <><Login /><Register /></>


      }


    </>
  )
}

export default LeftBarHeader
