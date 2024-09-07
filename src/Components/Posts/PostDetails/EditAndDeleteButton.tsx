import { useAppDispatch } from "@store/hooks"
import { DeletePost, actGetAllOneUserPosts } from "@store/posts/postSlice";
import { useState,memo } from "react";
import { Button, Modal, ModalBody } from "react-bootstrap"
import AddOREditPostButton from "../AddPostButton/AddOREditPostButton";

type TEditAndDeleteButtonprops={
  postId:number,
  titlePost?:string | undefined,
  messagePost?:string | undefined,
  id?:number | undefined

}


const EditAndDeleteButton= memo(({ postId,titlePost,messagePost ,id}: TEditAndDeleteButtonprops)=> {

  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);

  const DeleteHandler = async () => {
    await dispatch(DeletePost(postId)).unwrap().then(() => {
      setShow(!show)
      dispatch(actGetAllOneUserPosts(id as number))
    })
  }

  return (
    <span className="ms-auto">
      <Button variant="outline-secondary"
      >
        <AddOREditPostButton titleBtn="🖋 Edit" titlePost={titlePost} messagePost={messagePost} id={id}/>
      </Button>

      <Button
        variant="outline-danger"
      className="ms-2"
        onClick={() => setShow(!show)}

      >
        X Delete
      </Button>

      <Modal show={show} onHide={() => setShow(!show)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <ModalBody>
          Are you sure to delete this post?
        </ModalBody>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(!show)}>
            Close
          </Button>
          <Button variant="danger" onClick={DeleteHandler}>
            X Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </span>
  )
}
)
export default EditAndDeleteButton
