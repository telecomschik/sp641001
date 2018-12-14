import { auth } from "../firebase";

export const GETTING_USER = "GETTING_USER";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const GETTING_USER_END = "GETTING_USER_END";

export const getUser = () => {
  return (dispatch) => {
    dispatch({
      type: GETTING_USER,
      payload: true
    });
    auth.onAuthStateChanged((user) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user
      });
      dispatch({
        type: GETTING_USER_END,
        payload: false
      });
    });
  };
};

export const login = (email, password) => {
  return (dispatch) => auth.signInWithEmailAndPassword(email, password);
};

export const signOut = () => {
  return (dispatch) => auth.signOut();
};
