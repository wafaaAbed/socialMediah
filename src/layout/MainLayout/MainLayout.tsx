
import { Header, Footer } from '@Components/common'
import { Outlet } from 'react-router-dom'
import { Container } from "react-bootstrap";
import styles from "./style.module.css"
import { useAppSelector } from '@store/hooks';
import AddOREditPostButton from '@Components/Posts/AddPostButton/AddOREditPostButton';
const { container, wapper,addButoon } = styles;

function MainLayout() {
  const {accessToken}= useAppSelector((state)=>state.auth)
  return (
    <Container className={container}>
      <Header />
      
      <div className={wapper}>
        <Outlet />
        <div className={addButoon}>
      {accessToken && <AddOREditPostButton titleBtn="add"/> }
      </div>
      </div>
          
        </Container>
  )
}

export default MainLayout
