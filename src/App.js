import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Authentication/Login";
import AllPosts from "./Posts/AllPosts";
import Post from "./Posts/Post";
import { useSelector } from "react-redux";

function App() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const userLog = useSelector((state) => state.user.isLoggedIn);
  console.log(userLog);
  return (
    <Routes>
      {/* {!userLog ? navigate("/") : navigate("/posts")} */}
      <Route path="/" element={<Login />} exact type="guest" />
      <Route path="/posts" element={<AllPosts />} exact type="private" />
      <Route path="/post" element={<Post />} exact type="private" />
    </Routes>
  );
}

export default App;
