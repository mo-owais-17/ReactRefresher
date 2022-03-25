import postReducer from "../redux/post";
import userReducer from "../redux/user";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
});

export default rootReducer;
