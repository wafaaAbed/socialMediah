import { authLogout } from '@store/Auth/authSlice';
import { useAppDispatch } from '@store/hooks';
import  { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'



function Logout() {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);

  const handleModel =()=>{
    setShow(!show)
  }

  return (
    <><button onClick={handleModel}>
      Logout
    </button>
    
    
    <Modal show={show} onHide={handleModel}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to exit?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModel}>
            Close
          </Button>
          <Button variant='danger' onClick={()=>dispatch(authLogout())}>
            Exit
          </Button>
        </Modal.Footer>
      </Modal></>
  )
}

export default Logout
