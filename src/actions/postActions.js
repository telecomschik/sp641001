import { firebaseDB, database } from "../firebase";

export const GET_POSTS = "GET_POSTS";
export const GET_POST = "GET_POST";
export const SET_POSTS_FILTER = "SET_POSTS_FILTER";
export const SET_POSTS_INPUT_VALUE_FILTER = "SET_POSTS_INPUT_VALUE_FILTER";

export const getPosts = () => (dispatch) => {
  database.on("value", (snap) => {
    const posts = [];

    snap.forEach((post) => {
      const {
        title,
        brand,
        model,
        engene,
        year,
        city,
        price,
        description,
        imgURL,
        createdAt
      } = post.val();
      const serverKey = post.key;
      posts.push({
        id: serverKey,
        title,
        brand,
        model,
        engene,
        year,
        city,
        price,
        description,
        imgURL,
        createdAt
      });
    });

    posts.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    dispatch({
      type: GET_POSTS,
      payload: posts
    });
  });
};

export const getPost = (postId) => (dispatch) => {
  firebaseDB
    .ref("/posts/" + postId)
    .once("value")
    .then((snap) => {
      console.log({ snap });
      console.log({ snap: snap.val() });
      let payload = null;

      if (snap.val() != null) {
        payload = {
          serverKey: postId,
          ...snap.val()
        };
      }

      dispatch({
        type: GET_POST,
        payload
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getPostsByName = (postName) => (dispatch) => {
  console.log({ postName });
  database.once("value", (snap) => {
    const posts = [];

    snap.forEach((post) => {
      const { title, body, imgURL, createdAt } = post.val();
      const serverKey = post.key;

      if (~title.indexOf(postName)) {
        posts.push({ serverKey, title, body, imgURL, createdAt });
      }
    });

    posts.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    dispatch({
      type: GET_POSTS,
      payload: posts
    });
  });
};

export const removePost = (postId) => (dispatch) => {
  console.log({ postId });
  firebaseDB.ref("posts/" + postId).set(null, function(error) {
    if (error) {
      // The write failed...
      console.log("The write failed...", error);
    } else {
      // Data saved successfully!
      console.log("Data saved successfully!");
      dispatch({
        type: GET_POST,
        payload: null
      });
    }
  });
};

export const setPostsFilter = (strFilter) => (dispatch) => {
  console.log({ strFilter });
  dispatch({
    type: SET_POSTS_FILTER,
    payload: strFilter
  });
};

export const setPostsFilterInputValue = (strInputFilterValue) => (dispatch) => {
  console.log({ strInputFilterValue });
  dispatch({
    type: SET_POSTS_INPUT_VALUE_FILTER,
    payload: strInputFilterValue
  });
};
