import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleShowProfile,
  toggleShowSideBar,
  userSelector,
} from "../redux/reducers/userReducer";
import UserMessageForm from "./userMessageForm";
import { AiOutlineEye } from "react-icons/ai";
import UserProfile from "../components/userProfile";
import { BsArrowLeftCircle } from "react-icons/bs";

const UserMessage = () => {
  const { selectedChat, initialUser, showProfile, showSideBar } =
    useSelector(userSelector);

  const getName = () => {
    let users = selectedChat.users;
    const otherUser = users.find((obj) => obj._id !== initialUser.id);
    return otherUser;
  };
  const dispatch = useDispatch();
  return (
    <>
      <div
        className={`userMessage m-3 pr-2 bg-gray-300 rounded-md ${
          showSideBar ? "w-screen" : "hidden"
        } h-[85vh] md:w-[53vw] lg:w-[60vw] xl:w-[70vw] lg:block`}
      >
        <div className="messageContainer">
          {selectedChat.chatName ? (
            <div>
              <nav className="chatNavBar flex items-center justify-between bg-gray-300 p-2">
                <BsArrowLeftCircle
                  className="text-3xl cursor-pointer shadow-sm p-1  md:hidden"
                  onClick={() => dispatch(toggleShowSideBar())}
                />
                <div className="nameContainer uppercase">
                  {selectedChat.isGroupChat ? (
                    <p>{selectedChat.chatName}</p>
                  ) : (
                    <p>{getName().name}</p>
                  )}
                </div>
                <AiOutlineEye
                  className="text-3xl cursor-pointer shadow-sm p-1"
                  onClick={() => dispatch(toggleShowProfile(getName()))}
                />
                {showProfile ? <UserProfile /> : null}
              </nav>
              <UserMessageForm />
            </div>
          ) : (
            <div>
              <BsArrowLeftCircle
                className="text-3xl cursor-pointer shadow-sm p-1  md:hidden"
                onClick={() => dispatch(toggleShowSideBar())}
              />
              <p className="text-center font-semibold text-lg">
                Please Select any chat to continue
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserMessage;
