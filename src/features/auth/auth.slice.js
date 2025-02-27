import { createSlice } from "@reduxjs/toolkit";
import { redirect } from "next/navigation";

const initialState = {
  users: [],
  currentUser: null,
  isLoading: false,
  error: null,
};

export const authUserSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const user = state.users.find((user) => {
        user.email === action.payload.email;
      });
      if (!user) {
        state.users = [...state.users, action.payload];
      }
      state.currentUser = action.payload;
    },
    logout: (state, action) => {
      state.currentUser = null;
      redirect("/")
    },
  },
  extraReducers: (builder) => {},
});

export const { loginUser, logout } = authUserSlice.actions;

export default authUserSlice.reducer;
