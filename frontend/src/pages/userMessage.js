import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowProfile, userSelector } from "../redux/reducers/userReducer";
import UserMessageForm from "./userMessageForm";
import { AiOutlineEye } from "react-icons/ai";
import UserProfile from "../components/userProfile";

const UserMessage = () => {
  const { selectedChat, initialUser, showProfile } = useSelector(userSelector);

  const getName = () => {
    let users = selectedChat.users;
    const otherUser = users.find((obj) => obj._id !== initialUser.id);
    return otherUser;
  };
  const dispatch = useDispatch();
  return (
    <>
      <div className="userMessage m-3 p-3 bg-gray-300 w-full rounded-md">
        <div className="messageContainer">
          {selectedChat?.chatName ? (
            <div>
              <nav className="chatNavBar flex items-center justify-between bg-gray-300 p-2">
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
            <p>Please Select any chat to continue</p>
          )}
        </div>
      </div>
    </>
  );
};

export default UserMessage;
