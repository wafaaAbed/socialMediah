// import LottieHandler from "../LottieHandler/LottieHandler"
import { Suspense } from "react"



export default function PageSuspenseFallback({children}:{children:React.ReactNode}) {
  return (
    <Suspense fallback={"loading...."
      // <LottieHandler type="loading" message="loading please wait..."/>
    }>{children}</Suspense>
  )
}
