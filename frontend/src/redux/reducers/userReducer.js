import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: "",
  reducers: {
    authorizeUser: (state, action) => {
      const token = localStorage.getItem("userToken");
      console.log(token);
      state = token;
      return state;
    },
  },
  extraReducers: {},
});

export const userReducer = userSlice.reducer;
export const { authorizeUser } = userSlice.actions;
export const userSelector = (state) => state.userReducer;
