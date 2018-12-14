import {
  GET_POSTS,
  GET_POST,
  SET_POSTS_FILTER,
  SET_POSTS_INPUT_VALUE_FILTER
} from "../actions/postActions";

//const initialState = [];

export const postsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case GET_POSTS:
      return payload;
    default:
      return state;
  }
};

export const postReducer = (state = null, { type, payload }) => {
  switch (type) {
    case GET_POST:
      return payload;
    default:
      return state;
  }
};

export const postsFilterReducer = (state = "", { type, payload }) => {
  switch (type) {
    case SET_POSTS_FILTER:
      return payload;
    default:
      return state;
  }
};

export const postsFilterInputReducer = (state = "", { type, payload }) => {
  switch (type) {
    case SET_POSTS_INPUT_VALUE_FILTER:
      return payload;
    default:
      return state;
  }
};
