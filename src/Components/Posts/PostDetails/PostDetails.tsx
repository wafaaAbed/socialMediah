import { TPost } from "@types";
import { Button,  Collapse, Form, InputGroup } from "react-bootstrap";
import imageParson from "@assets/person.png"
import style from "../MainPost/style.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { memo, useState } from "react";
import { actCreateComment, actGetOnePostById } from "@store/posts/postSlice";
import EditAndDeleteButton from "./EditAndDeleteButton";
const { post, avatar, userName, imgPost, commentsContainer, commentInfo } = style;


type TPostDetailsProps = TPost & {
  isConmment?: boolean,
}


const PostDetails = memo(({ id, author, image, body, title, created_at, comments_count, comments, isConmment = true }: TPostDetailsProps) => {
  const { accessToken, user } = useAppSelector((state) => state.auth)
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams()
  const PostUserHandler = () => {

    if (params.id) {
      return;
    } else {
      navigate(`post/${id}`);
    }
  }

  return (
    <>
      <div className={`${post} bg-body-tertiary  pb-3 my-3`} key={id} >
        {/* avatar image and name */}
        <div className="d-flex justify-content-start  align-items-center">
          <div className={avatar} onClick={() => { navigate(`/profile/${author?.username}/${author?.id}`) }}>
            <img
              src={author?.profile_image === null ? imageParson : author?.profile_image}
              className="img-fluid me-2"
              alt={title}
            />

            <p className={userName}>{author?.username}</p>
          </div>

          {user && (+user.id === author?.id) &&
            <EditAndDeleteButton postId={id} titlePost={title} messagePost={body} id={id} />
          }


        </div>
        <hr className="m-0" />
        <span onClick={() => { PostUserHandler() }}>
          <div
            className={imgPost}
          >
            <img src={image === null ? imageParson : image} className="img-fluid" alt="ima" />
          </div>

          <p className="text-body-tertiary m-2">{created_at}</p>
          <h5 className="title m-2">{title}</h5>
          <p className="m-2">{body}</p>

          <hr />
          <div className="p-1" >
            <span className="text-body-secondary mb-2" style={{ cursor: "pointer" }}
              aria-controls="example-collapse-text"
              aria-expanded={open}
              onClick={() => { setOpen(!open), console.log(open) }}
            >
              💭 ({comments_count}) Comments
            </span>

            <hr />

            {comments && comments.map((comment) => (
              <Collapse in={open} key={comment.id}>
                <div className={commentsContainer} id="example-collapse-text">
                  <div className={avatar}>
                    <img className="mt-2" src={comment.author?.profile_image} alt="" />
                  </div>
                  <div className={commentInfo}>
                    <h5>{comment.author?.username}</h5>
                    <p>{comment.body}</p>
                  </div>
                </div>
              </Collapse>
            ))}


          </div>

          {(accessToken && isConmment) &&
            <Form className="m-3">
              <InputGroup >
                <Form.Control
                  placeholder="Enter Comment"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}

                />
                <Button variant="outline-secondary" id="button-addon2"
                  onClick={() => {
                    if (comment === "") {
                      return;
                    }
                    dispatch(actCreateComment({ comment, id })).unwrap()
                      .then(() => {
                        setComment("")
                        dispatch(actGetOnePostById(id))
                        navigate(0)
                      }

                      )
                  }
                  }
                >
                  send
                </Button>
              </InputGroup>
            </Form>

          }
        </span>

      </div>
    </>
  )
}
)
export default PostDetails
