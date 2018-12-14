import { combineReducers } from "redux";
import { loadingReducer } from "./loadingReducer";
import { userReducer } from "./userReducer";
import {
  postsReducer,
  postReducer,
  postsFilterReducer,
  postsFilterInputReducer
} from "./postReducer";

export default combineReducers({
  userLoading: loadingReducer,
  user: userReducer,
  posts: postsReducer,
  post: postReducer,
  inputFilterValue: postsFilterInputReducer,
  filter: postsFilterReducer,
  editPost: postReducer
});
