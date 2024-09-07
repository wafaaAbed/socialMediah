import Input from "@Components/FormInput/Input";
import { useEffect, useState } from "react";
import { Button,  Form, Modal } from "react-bootstrap"
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, signUpType } from "@validation/signUpSchema"
import style from "./style.module.css";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actRegister, resetUI } from "@store/Auth/authSlice";
import { useNavigate } from "react-router-dom";

const { formContainer ,btnSubmit} = style;
function Register() {
  const dispatch = useAppDispatch();
  const {error} = useAppSelector((state)=>state.auth);
const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { register, handleSubmit,formState: { errors,isSubmitting  } } = useForm<signUpType>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema,{},{ raw: true }),
  
  });

  const submitForm: SubmitHandler<signUpType> = async (data) => {
  
    const {image,userName,password,email,name} = data; 
     
       const userImageFile =image as unknown as FileList;
       const userImage = userImageFile?.[0]
    dispatch(actRegister({ userImage, userName,password,email,name})).unwrap()
    .then(()=>{
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
      Register
    </button>

    <Modal show={show} onHide={ModelHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Resister New User</Modal.Title>
        </Modal.Header>
      
        <Form className={`my-1 ${formContainer}`} onSubmit={handleSubmit(submitForm)}>
        <Modal.Body>   
               <Input  title="User Name" type="text" name="userName" register={register} error={errors.userName?.message
                  ?errors.email?.message :
                 error && error.includes("username") ? error : ""
               } />
               <Input  title="Name" type="text" name="name" register={register} error={errors.name?.message} />
              <Input  title="Email" type="text" name="email" register={register} error={errors.email?.message
                ?errors.email?.message :
                 error && error.includes("email") ? error : ""
              } 
            
             />
              
            
              <Input  title="Password" type="password" name="password" register={register} error={errors.password?.message} />
              <Input  title="Confirm Password" type="password" name="confirmPassword" register={register} error={errors.confirmPassword?.message} />
              <Input  title="Image" type="file" name="image" register={register} error={errors.image?.message} />

        </Modal.Body>
      
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

    </>
  )
}

export default Register
