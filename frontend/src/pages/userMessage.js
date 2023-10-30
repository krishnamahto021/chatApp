import React from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/reducers/userReducer";

const UserMessage = () => {
  const { selectedChat } = useSelector(userSelector);
  console.log(selectedChat);
  return (
    <>
      <div className="userMessage m-3 p-3 bg-gray-300 w-full rounded-md">
        <div className="messageContainer">
          {selectedChat ? <>hi</> : <p>Please Select any chat to continue</p>}
        </div>
      </div>
    </>
  );
};

export default UserMessage;
