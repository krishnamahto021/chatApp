import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setMessageArray,
  setNotifications,
  userSelector,
} from "../redux/reducers/userReducer";
import axios from "axios";
import { toast } from "react-toastify";
import ScrollableChat from "./scrollableChat";
import { io } from "socket.io-client";
import Lottie from "lottie-react";
import animationData from "../animation/Animation - 1699174380745.json";

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const UserMessageForm = () => {
  const [message, setMessage] = useState("");
  const { selectedChat, initialUser, notifications } =
    useSelector(userSelector);
  const [socketIo, setSocketIo] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("Setting up socket and event listeners...");
    socket = io(ENDPOINT);
    socket.emit("setup", initialUser);
    socket.on("connected", () => {
      // console.log("Connected event received.");
      setSocketIo(true);
    });
    socket.on("typing", () => setIsTyping(true));
    socket.on("stopTyping", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchAllMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("messageRecieved", (newMessageRec) => {
      // console.log(
      //   !selectedChatCompare,
      //   selectedChatCompare._id,
      //   newMessageRec.chat._id
      // );
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRec.chat._id
      ) {
        // show notifications
      } else {
        // the logged in user and sender should not be same to recive the message as for sender we are already handling in the submit handler to dispatch the message
        if (newMessageRec.sender._id !== initialUser.id) {
          dispatch(setMessageArray(newMessageRec));
        }
      }
    });
  }, []);

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
      socket.emit("joinChat", selectedChat._id);
    } catch (error) {
      console.log(`Error in fetching chat ${error}`);
      // toast.error(`Error in fetching chats`);
    }
  };

  const clearInput = async () => {
    setMessage("");
  };

  const typingHandler = async (e) => {
    setMessage(e.target.value);
    if (!socketIo) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= 3 && typing) {
        socket.emit("stopTyping", selectedChat._id);
        setTyping(false);
      }
    }, 3000); // stop typing is the user is not typoing for 3 seconds
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    socket.emit("stopTyping", selectedChat._id);
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
    socket.emit("newMessage", data);
    dispatch(setMessageArray(data));
    clearInput();
  };

  return (
    <>
      <ScrollableChat />
      {isTyping ? (
        <div>
          <Lottie
            animationData={animationData}
            style={{ width: 60, height: 60 }}
          />
        </div>
      ) : null}
      <div className="inputContainer ml-1 ">
        <form className="flex gap-8 sm:gap-14" onSubmit={submitHandler}>
          <textarea
            placeholder="Type your message ... "
            className="inputFeild  rounded-xl p-1 pb-2 focus:border-transparent focus:outline-none resize-none w-[60vw] h-10 sm:h-12  sm:p-2 scrollbar-thin"
            value={message}
            onChange={typingHandler}
            required
          ></textarea>
          <button
            className="sendButton bg-violet-500 hover:bg-violet-600 text-white rounded-lg p-2 text-lg "
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
