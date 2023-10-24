import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialUser = JSON.parse(localStorage.getItem("user")) || {};
const initialState = {
  initialUser,
  showProfile: false,
  searchedUsers: [],
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    authorizeUser: (state, action) => {
      return state;
    },
    logOutUser: (state, action) => {
      localStorage.removeItem("user");
      state = "";
      toast.success("Logged out Successfully!");
      return state;
    },
    toggleShowProfile: (state, action) => {
      state.showProfile = !state.showProfile;
      return state;
    },
    setSearchedUsers: (state, action) => {
      console.log(action.payload);
      state.searchedUsers = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const {
  authorizeUser,
  logOutUser,
  toggleShowProfile,
  setSearchedUsers,
} = userSlice.actions;
export const userSelector = (state) => state.userReducer;
