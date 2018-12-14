import { LOGIN_SUCCESS } from "../actions/userActions";
const initialState = null;

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return payload;
    default:
      return state;
  }
};
