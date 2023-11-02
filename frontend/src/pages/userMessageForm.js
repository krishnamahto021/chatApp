import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessageArray, userSelector } from "../redux/reducers/userReducer";
import axios from "axios";
import { toast } from "react-toastify";
import ScrollableChat from "./scrollableChat";

const UserMessageForm = () => {
  const [message, setMessage] = useState("");
  const { selectedChat, initialUser } = useSelector(userSelector);
  const dispatch = useDispatch();

  const fetchAllMessages = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${initialUser.token}`,
        },
      };
      const { data } = await axios.get(
        `/user/chat/message/${selectedChat._id}`,
        config
      );
      dispatch(setMessageArray(data));
    } catch (error) {
      console.log(`Error in fetching chat ${error}`);
      toast.error(`Error in fetching chats`);
    }
  };

  const clearInput = async () => {
    setMessage("");
  };

  const typingHandler = async (e) => {
    setMessage(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${initialUser.token}`,
      },
    };
    const { data } = await axios.post(
      "/user/chat/message",
      { chatId: selectedChat._id, content: message },
      config
    );
    dispatch(setMessageArray(data));
    clearInput();
  };

  useEffect(() => {
    fetchAllMessages();
  }, [selectedChat]);

  return (
    <>
      <ScrollableChat />
      <div className="inputContainer  gap-9 flex  content-stretch ">
        <form
          className="flex items-center content-between gap-32"
          onSubmit={submitHandler}
        >
          <input
            placeholder="Type your message ... "
            className="inputFeild  rounded-xl p-2 w-[55rem] focus:border-transparent focus:outline-none"
            value={message}
            onChange={typingHandler}
            required
          ></input>
          <button
            className="sendButton bg-violet-500 hover:bg-violet-600 text-white rounded-lg p-2 "
            onClick={submitHandler}
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default UserMessageForm;
