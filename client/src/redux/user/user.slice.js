import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: {},
};

export const userSLice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const payload = action.payload;
      state.isLoggedIn = true;
      state.user = payload;
    },
    removeUser: (state) => {
      state.isLoggedIn = false;
      state.user = {};
    },
  },
});

export const { setUser, removeUser } = userSLice.actions;

export default userSLice.reducer;
