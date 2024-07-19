import { useAppSelector } from "@store/hooks"
import  {Navigate}  from "react-router-dom"

export default function ProtectedRoutes({children}:{children: React.ReactNode}) {
  const {accessToken} = useAppSelector((state)=>state.auth);

  if(!accessToken){
    return <Navigate to={"/"} />
  }

  return (
    <div>
      {children}
    </div>
  )
}
