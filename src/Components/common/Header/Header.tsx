import { Container, Nav, Navbar } from "react-bootstrap"
import Logo from "@assets/svg/logo.svg?react"
import style from "./style.module.css"
import { NavLink } from "react-router-dom";
import LeftBarHeader from "./LeftBarHeader/LeftBarHeader";

import { useAppSelector } from "@store/hooks";


const { logoformat, btnDesgin } = style;

function Header() {
  
  const { accessToken, user } = useAppSelector((state) => state.auth)

  return (
    <header>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand ><span className={logoformat}><Logo /></span></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={NavLink} to={"/"}> 🏠 Home</Nav.Link>
              {accessToken && user &&
                <Nav.Link as={NavLink} to={`profile/${user?.username}/${user?.id}`}> 💁 Profile</Nav.Link>
              }
            </Nav>
            <Nav className={btnDesgin}>
            <LeftBarHeader accessToken={accessToken} user={user} />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
