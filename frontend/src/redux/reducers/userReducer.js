import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const userSlice = createSlice({
  name: "user",
  initialState: localStorage.getItem("userToken"),
  reducers: {
    authorizeUser: (state, action) => {
      const token = localStorage.getItem("userToken");
      state = token;
      return state;
    },
    logOutUser: (state, action) => {
      localStorage.removeItem("userToken");
      state = "";
      toast.success("Logged out Successfully!");
      return state;
    },
  },
  extraReducers: {},
});

export const userReducer = userSlice.reducer;
export const { authorizeUser, logOutUser } = userSlice.actions;
export const userSelector = (state) => state.userReducer;
