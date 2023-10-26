import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// const initialUser = JSON.parse(localStorage.getItem("user")) || {};
const initialState = {
  initialUser: {},
  showProfile: false,
  searchedUsers: [],
  selectedChat: {},
  chats: [],
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    authorizeUser: (state, action) => {
      return {
        ...state,
        initialUser: JSON.parse(localStorage.getItem("user")) || {},
      };
    },
    logOutUser: (state, action) => {
      localStorage.removeItem("user");
      toast.success("Logged out successfully!");
      return {
        ...initialState,
        initialUser: {},
      };
    },

    toggleShowProfile: (state, action) => {
      state.showProfile = !state.showProfile;
      return state;
    },

    setSearchedUsers: (state, action) => {
      state.searchedUsers = action.payload;
    },

    setSelectedChat: (state, actions) => {
      state.selectedChat = actions.payload;
    },

    setChats: (state, actions) => {
      state.chats = actions.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const {
  authorizeUser,
  logOutUser,
  toggleShowProfile,
  setSearchedUsers,
  setSelectedChat,
  setChats,
} = userSlice.actions;
export const userSelector = (state) => state.userReducer;
