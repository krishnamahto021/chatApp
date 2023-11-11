import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setChats, userSelector } from "../redux/reducers/userReducer";

const UserView = (props) => {
  const { initialUser } = useSelector(userSelector);
  const dispatch = useDispatch();
  const { searchedUser, handleFunction, setSelectedChat } = props;
  const createChat = async (userId) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${initialUser.token}`,
        },
      };
      const { data } = await axios.post("/user/chat", { userId }, config);
      dispatch(setChats(data));
    } catch (error) {
      toast.error("Internal Serever Error!");
      console.log("Error in rendering chats", error);
    }
  };

  return (
    <>
      <div
        className="container flex gap-2 m-1 items-center border-b border-gray-400 hover:bg-gray-400 cursor-pointer "
        onClick={() => createChat(searchedUser._id)}
      >
        <div className="imageContainer p-2" onClick={handleFunction}>
          <img
            src={searchedUser?.profileImage}
            alt={searchedUser?.name}
            className="image rounded-full w-[56px] h-[56px]"
          ></img>
        </div>
        <div
          className="textContainer flex flex-col m-4 "
          onClick={setSelectedChat}
        >
          <p className="userName text-[18px] ">{searchedUser?.name}</p>
          <p>Message</p>
        </div>
      </div>
    </>
  );
};

export default UserView;
