import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { postActions } from "../redux/post";
import { userActions } from "../redux/user";

const AllPosts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [noPosts, setNoPosts] = useState("");

  const allPosts = useSelector((state) => state?.post?.posts);
  const [filteredPosts, setFilteredPosts] = useState(allPosts);
  const user = useSelector((state) => state.user.isLoggedIn);
  const userData = useSelector((state) => state.user.currentUser);
  console.log(user);

  const fetchPosts = () => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPosts(data.slice(0, 10));
        setLoading(false);
        dispatch(postActions.fetchPosts(data.slice(0, 10)));
      });
  };
  console.log("All Posts: ", allPosts);
  console.log("Filtered Posts: ", filteredPosts);

  useEffect(() => {
    if (allPosts.length == 0) {
      fetchPosts();
    }
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(user);
        dispatch(userActions.userAuth(user.email));
      } else {
        console.log("user not available.");
      }
    });
  };
  console.log("User Now", userData);

  useEffect(() => {
    setFilteredPosts(allPosts);
  }, [allPosts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/post");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(userActions.userLogin(false));
    navigate("/");
  };

  const handleSearch = (e) => {
    let value = e.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = allPosts.filter((data) => {
      return data.title.search(value) !== -1 || data.body.search(value) !== -1;
    });
    setFilteredPosts(result);
    setNoPosts(value);
  };

  return (
    <Container>
      <h2>All Posts</h2>
      <div style={{ margin: "0 auto", marginTop: "2%", marginBottom: "2%" }}>
        <label>Search: </label>
        <input type="text" onChange={handleSearch} />
      </div>
      {loading ? (
        <h5>Loading Posts...</h5>
      ) : filteredPosts.length == 0 ? (
        <h5>No posts for {noPosts}</h5>
      ) : (
        filteredPosts?.map((post, id) => {
          return (
            <Card className="bg-light border" key={post.id}>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.body}</Card.Text>
              </Card.Body>
            </Card>
          );
        })
      )}

      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Add New Post
      </Button>

      <Button variant="primary" type="submit" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
};

export default AllPosts;
