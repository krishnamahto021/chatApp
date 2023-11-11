import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// const initialUser = JSON.parse(localStorage.getItem("user")) || {};
const initialState = {
  initialUser: {},
  showProfile: false,
  showUserProfile: {},
  searchedUsers: [],
  selectedChat: {},
  chats: [],
  messageArray: [],
  notifications: [],
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
      return {
        ...state,
        showProfile: !state.showProfile,
        showUserProfile: action.payload, // This will be the user data you want to display
      };
    },

    setSearchedUsers: (state, action) => {
      state.searchedUsers = action.payload;
    },

    setSelectedChat: (state, actions) => {
      state.selectedChat = actions.payload;
    },

    setChats: (state, action) => {
      const payload = action.payload;
      if (Array.isArray(payload)) {
        // If payload is an array (dispatched from userContainer)
        // console.log("array");
        // Filter out duplicates from the payload and add only new chats to the state
        const newChats = payload.filter(
          (chat) =>
            !state.chats.some((existingChat) => existingChat.id === chat.id)
        );
        state.chats = [...newChats, ...state.chats];
        // console.log(state.chats, "inside reducer");
      } else if (typeof payload === "object") {
        // If payload is an object (dispatched from createGroupChat)
        // You may want to merge it with the existing chats or handle it differently
        // console.log("payload", payload);
        // console.log("object", state.chats);

        if (payload.message === "Group Chat Id Sent!") {
          // to check whether the
          // console.log("inisdie the payload");
          return;
        }
        const existingChatIndex = state.chats.findIndex(
          (existingChat) => existingChat._id === payload._id
        );
        if (existingChatIndex !== -1) {
          // Chat already exists, update it
          state.chats[existingChatIndex] = payload;
        } else {
          // Chat doesn't exist, add it
          state.chats = [payload, ...state.chats];
        }
        // console.log(state.chats);
      }
    },

    removeUserFromGroupChat: (state, action) => {
      const userIdToRemove = action.payload;
      state.selectedChat.users = state.selectedChat.users.filter(
        (u) => u._id !== userIdToRemove
      );
    },

    addUserToGroup: (state, action) => {
      const userToAdd = action.payload;
      state.selectedChat.users = [userToAdd, ...state.selectedChat.users];
    },

    setMessageArray: (state, action) => {
      const payload = action.payload;
      if (Array.isArray(payload)) {
        state.messageArray = [...payload];
      } else {
        state.messageArray = [...state.messageArray, payload];
      }
    },

    setNotifications: (state, action) => {
      console.log(action.payload);
      state.notifications = [action.payload, ...state.notifications];
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
  removeUserFromGroupChat,
  addUserToGroup,
  setMessageArray,
  setNotifications,
} = userSlice.actions;
export const userSelector = (state) => state.userReducer;
