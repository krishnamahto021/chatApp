import SearchBar from "./search";
import UserContainer from "./userContainer";
import UserMessage from "./userMessage";
import { useDispatch } from "react-redux";
import { logOutUser } from "../redux/reducers/userReducer";
import { IoNotifications } from "react-icons/io5";
import { AiOutlineDown } from "react-icons/ai";
import { useState } from "react";

const ChatPage = () => {
  const dispatch = useDispatch();
  const [showLogOut, setShowLogOut] = useState(false);
  return (
    <>
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-screen">
        <div className="navBar flex items-center justify-between flex-wrap ">
          <SearchBar />
          <div className="tracking-widest font-semibold text-lg -ml-2">
            Chat App
          </div>
          <div className="flex items-center justify-between gap-4 m-2">
            <IoNotifications className="font-bold text-2xl" />
            <div className="loggedInUser ">
              <img
                src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                alt="keishna"
                className="w-8 h-8 rounded-full"
              ></img>
            </div>
            <AiOutlineDown
              className="font-bold text-lg cursor-pointer"
              onClick={() => setShowLogOut(!showLogOut)}
            />
            {showLogOut ? (
              <button onClick={() => dispatch(logOutUser())}>Log Out</button>
            ) : null}
          </div>
        </div>
        <div className="chatContainer flex ">
          <UserContainer />
          <UserMessage />
        </div>
      </div>
    </>
  );
};

export default ChatPage;
