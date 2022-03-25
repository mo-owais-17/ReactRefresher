import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postActions } from "../redux/post";

const Post = (props) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.post.posts);
  const user = useSelector((state) => state.user.isLoggedIn);

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const bodyChangeHandler = (e) => {
    setBody(e.target.value);
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      userId: 1,
      id: Math.random(),
      title: title,
      body: body,
    };
    dispatch(postActions.addPost(newPost));
    navigate("/posts");
  };

  console.log("All Posts", allPosts);

  return (
    <Container>
      <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">
        Add New Post
      </h1>
      <Form className="mb-5">
        <Form.Group className="mb-2">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={titleChangeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Body</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter body"
            value={body}
            onChange={bodyChangeHandler}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Post;
