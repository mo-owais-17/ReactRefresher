import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    fetchPosts(state, action) {
      return { ...state, posts: action.payload };
    },
    addPost(state, action) {
      // state.posts.unshift(action.payload);
      return { ...state, posts: [action.payload, ...state.posts] };
    },
  },
});

export const postActions = postSlice.actions;
export default postSlice.reducer;
