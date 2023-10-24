import React from "react";

const UserView = (props) => {
  const { searchedUser } = props;
  return (
    <>
      <div className="container flex gap-2 m-1  border-b border-gray-400 hover:bg-gray-400 cursor-pointer ">
        <div className="imageContainer m-1 p-2">
          <img
            src={searchedUser.profileImage}
            alt={searchedUser.name}
            className="image w-14 h-w-14 rounded-full "
          ></img>
        </div>
        <div className="textContainer flex flex-col m-4 ">
          <p className="userName text-[18px] ">{searchedUser.name}</p>
          <p>Message</p>
        </div>
      </div>
    </>
  );
};

export default UserView;
