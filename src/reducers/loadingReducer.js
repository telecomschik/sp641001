import { GETTING_USER, GETTING_USER_END } from "../actions/userActions";
const initialState = true;

export function loadingReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GETTING_USER:
      return payload;
    case GETTING_USER_END:
      return payload;
    default:
      return state;
  }
}
