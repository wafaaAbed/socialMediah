import Input from "@Components/FormInput/Input";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap"

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, signInType } from "@validation/signInSchema";
import styles from "../Register/style.module.css";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useNavigate } from "react-router-dom";
import { actLogin, resetUI } from "@store/Auth/authSlice";
const {formContainer,btnSubmit} =styles;

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const {error} = useAppSelector((state)=>state.auth);

  const [show, setShow] = useState(false);
  const { register, handleSubmit, formState: { errors,isSubmitting} } = useForm<signInType>({
    mode: "onBlur",
    resolver: zodResolver(signInSchema)
  });
  
  const submitForm: SubmitHandler<signInType> = (data) => {

    dispatch(actLogin(data)).unwrap().then(() => {
      navigate("/");
      setShow(!show)
    })
  }



  const ModelHandler=()=>{
    setShow(!show)
  }
  useEffect(() => {
    return () => {
      dispatch(resetUI());
    }
  }, [dispatch])
  return (
    <>
    <button onClick={ModelHandler}>
      Login
    </button>

    <Modal show={show} onHide={ModelHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
    
        <Form className={`my-1 ${formContainer}`} onSubmit={handleSubmit(submitForm)}>
        <Modal.Body>
          <Input  title="User Name" type="text" name="userName" register={register} error={errors.userName?.message}/>
          <Input  title="Password" type="password" name="password" register={register} error={errors.password?.message} />

        </Modal.Body>
        {error && (
              <p style={{ color: "#DC3545", marginTop: "10px" ,textAlign:"center"}}>{error}</p>
            )}
        <Modal.Footer >
          <Button variant="secondary" onClick={ModelHandler}>
            Close
          </Button>
          <Button type="submit" className={btnSubmit}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>

        </Modal.Footer>
        </Form>
      </Modal>

    </>)
}

export default Login
