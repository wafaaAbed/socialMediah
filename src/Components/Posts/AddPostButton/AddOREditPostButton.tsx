import AddButton from "@assets/svg/add.svg?react"

import { Button, Form, Modal } from "react-bootstrap";
import { memo, useEffect, useState } from "react";
import Input from "@Components/FormInput/Input";

import { useAppDispatch } from "@store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { addPostSchema, addpostType } from "@validation/addPostSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddAndEditePost } from "@store/posts/postSlice";
import { useNavigate } from "react-router-dom";

type TAddOREditPostButtonProps={
  titleBtn:string,
  titlePost?:string | null,
  messagePost?:string | null,
  id?:number | null,
}


const AddOREditPostButton = memo(({titleBtn,titlePost,messagePost,id}:TAddOREditPostButtonProps)=> {

  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const [show, setShow] = useState(false);

  
  const { register, handleSubmit,setValue  ,formState: { errors, isSubmitting } } = useForm<addpostType>({
    mode: "onBlur",
    resolver: zodResolver(addPostSchema),

  });

  const submitForm: SubmitHandler<addpostType> = (data) => {
    const { title, message, image } = data;
    const type = titleBtn === "add" ? "put" : "edit";
    dispatch(AddAndEditePost({ title, message, image, type, id })).unwrap().then(() => {
      setShow(!show)
      navigate(0)
    })
  }
useEffect(()=>{
  setValue('title',titlePost)
  setValue('message',messagePost)
},[])

  return (
    <><span title="Add Post" onClick={() => setShow(!show)} >
    {titleBtn === "add" ? <AddButton /> : "🖋 Edit"}
      </span>
      <Modal show={show} onHide={() => setShow(!show)}>
        <Modal.Header closeButton>
          <Modal.Title>
          {titleBtn === "add" ? "+ Add New Post" : "🖋 Edit Post"}
            </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(submitForm)}>
          <Modal.Body>
            <Input title="Title" type="text" name="title" register={register} error={errors.title?.message} 
                      />
            <Input title="Message" type="textarea" name="message" register={register} error={errors.message?.message} />
            <Input title="Image" type="file" name="image" register={register} error={errors.image?.message} />
          </Modal.Body>
          {/* {error && (
              <p style={{ color: "#DC3545", marginTop: "10px" ,textAlign:"center"}}>{error}</p>
            )} */}
          <Modal.Footer >
            <Button variant="secondary" onClick={() => setShow(!show)}>
              Close
            </Button>
            <Button type="submit">
              {isSubmitting ? 'Submitting...' : 
              (titleBtn === "add" ? "Add Post" : "Edit")
            }
            </Button>

          </Modal.Footer>
        </Form>


      </Modal>
    </>
  )
}
)
export default AddOREditPostButton
