import React from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/reducers/userReducer";
import ScrollableFeed from "react-scrollable-feed";

const ScrollableChat = () => {
  const { messageArray, initialUser } = useSelector(userSelector);

  // Function to determine if the message is from the current user
  const isCurrentUser = (message) => {
    return message.sender._id === initialUser.id;
  };

  // Function to determine if the message is the last one
  const isLastMessage = (index) => {
    return index === messageArray.length - 1;
  };

  return (
    <ScrollableFeed className="h-[68vh] pb-5 scrollbar-thin">
      {messageArray.map((message, index) => (
        <div
          key={index}
          className={`singleMessage max-w-md ml-2 p-2 rounded-md mb-2 w-fit  ${
            isCurrentUser(message) ? "bg-cyan-500 " : "bg-blue-400 ml-auto "
          }`}
        >
          {message.content}

          {/* Display sender/receiver only if it's the last message */}
          {isLastMessage(index) && (
            <div className="text-xs text-gray-500 mt-1">
              {isCurrentUser(message) ? "You" : message.sender.name}
            </div>
          )}
        </div>
      ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
