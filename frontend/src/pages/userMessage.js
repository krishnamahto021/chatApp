import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setChats, userSelector } from "../redux/reducers/userReducer";

const UserMessage = () => {
  const dispatch = useDispatch();
  const { initialUser } = useSelector(userSelector);
  const fetchChats = async (userId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${initialUser.token}`,
        },
      };
      const { data } = await axios.get("/user/chat", config);
      dispatch(setChats([data]));
    } catch (error) {
      toast.error(`Error in fetching Chats`);
      console.log(`Error in fetching chats ${error}`);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);
  return (
    <>
      <div className="userMessage m-3 p-3 bg-gray-300 w-full rounded-md">
        <div className="messageContainer"></div>
      </div>
    </>
  );
};

export default UserMessage;
