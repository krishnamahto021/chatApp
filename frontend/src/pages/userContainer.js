import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChats, userSelector } from "../redux/reducers/userReducer";
import UserView from "./userView";
import axios from "axios";
import { toast } from "react-toastify";

const UserContainer = () => {
  const { initialUser, chat } = useSelector(userSelector);
  const dispatch = useDispatch();

  const fetchChats = async (userId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${initialUser.token}`,
        },
      };
      const { data } = await axios.get("/user/chat", config);
      dispatch(setChats([data]));
    } catch (error) {
      toast.error(`Error in fetching Chats`);
      console.log(`Error in fetching chats ${error}`);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const getName = (c) => {
    console.log(c);
    if (c && !c.isGroupChat && c.users && c.users.length >= 2) {
      return c.users[1];
    }
    // Handle the case where the chat or user data is missing
    return null; // Or provide a default value or handle it as needed
  };

  return (
    <>
      <aside className=" bg-gray-300 rounded-md p-2 m-3 h-[85vh]">
        <div className="usersContainer  w-[385px] pl-1  ">
          {chat.length > 1 ? (
            chat.map((c, index) => {
              const user = getName(c[0]);
              return <UserView key={index} searchedUser={user} />;
            })
          ) : (
            <p>No chats available</p>
          )}
        </div>
      </aside>
    </>
  );
};

export default UserContainer;
