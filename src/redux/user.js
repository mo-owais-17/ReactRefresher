import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userAuth(state, action) {
      return { ...state, currentUser: action.payload };
    },
    userLogin(state, action) {
      return { ...state, isLoggedIn: action.payload };
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
