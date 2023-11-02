import React from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/reducers/userReducer";
import ScrollableFeed from "react-scrollable-feed";

const ScrollableChat = () => {
  const { messageArray, initialUser } = useSelector(userSelector);
  console.log(messageArray[0]);
  const leftOrRight = (message) => {
    if (message.sender._id === initialUser.id) {
      return "left";
    } else {
      return "right";
    }
  };
  return (
    <ScrollableFeed className="max-h-[70vh]">
      {messageArray.map((message, index) => (
        <div
          key={index}
          className={`singleMessage max-w-md ml-2 p-2 rounded-md mb-2 w-fit  ${
            leftOrRight(message) === "left"
              ? "bg-cyan-500 "
              : "bg-blue-400 ml-auto "
          }`}
        >
          {message.content}
        </div>
      ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
