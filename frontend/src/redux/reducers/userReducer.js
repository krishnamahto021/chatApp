import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// const initialUser = JSON.parse(localStorage.getItem("user")) || {};
const initialState = {
  initialUser: {},
  showProfile: false,
  searchedUsers: [],
  selectedChat: {},
  chat: [],
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
    setChats: (state, action) => {
      // Check if the chat already exists in the state
      const newChat = action.payload[0]; // Assuming payload is an array with a single chat object
      const existingChatIndex = state.chat.findIndex(
        (chat) => chat.chatId === newChat.chatId
      ); // Modify 'chatId' to match your chat data structure

      if (existingChatIndex !== -1) {
        // Chat already exists, update the chat data in the state
        state.chat[existingChatIndex] = newChat; // Assuming 'newChat' contains the updated chat information
      } else {
        // Chat doesn't exist, add the new chat to the state
        state.chat.push(newChat);
      }
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
