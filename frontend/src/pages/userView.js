import React from "react";

const UserView = () => {
  return (
    <>
      <div className="container  flex  items-center border-b border-gray-400 hover:bg-gray-400  ">
        <div className="imageContainer m-1 p-2">
          <img
            src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
            alt="name"
            className="image w-14 h-w-14 rounded-full "
          ></img>
        </div>
        <div className="textContainer flex flex-col ">
          <p className="userName text-[18px] ">Krishna</p>
          <p>Message</p>
        </div>
      </div>
    </>
  );
};

export default UserView;
