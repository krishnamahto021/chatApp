import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userSelector } from "../redux/reducers/userReducer";

const UserView = (props) => {
  const { initialUser } = useSelector(userSelector);
  const { searchedUser } = props;
  const createChat = async (userId) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${initialUser.token}`,
        },
      };
      const { data } = await axios.post("/user/chat", { userId }, config);
      console.log(data);
    } catch (error) {
      toast.error("Internal Serever Error!");
      console.log("Error in rendering chats", error);
    }
  };

  return (
    <>
      <div
        className="container flex gap-2 m-1  border-b border-gray-400 hover:bg-gray-400 cursor-pointer "
        onClick={() => createChat(searchedUser._id)}
      >
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
