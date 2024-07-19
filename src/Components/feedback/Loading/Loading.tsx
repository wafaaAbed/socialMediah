import { TLoading } from '@types';
import React from 'react'
import LottieHandler from '../LottieHandler/LottieHandler';


type TLoadingProps = {

  status: TLoading,
  type?: string,
  error: null | string;
  children: React.ReactNode;
}
function Loading({status,error,children }: TLoadingProps) {
  if(status === "pending"){
    return <p><LottieHandler type="loading" message="Loading..."/></p>
  }
  if(status === "failed")
    {
  return <p><LottieHandler type="error" message={error as string}/></p>

  }
  return (
    <>
{children}
    </>
  )
}

export default Loading
