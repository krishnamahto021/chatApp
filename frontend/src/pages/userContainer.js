import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChats, userSelector } from "../redux/reducers/userReducer";
import UserView from "./userView";
import axios from "axios";
import { toast } from "react-toastify";

const UserContainer = () => {
  const { initialUser, chats } = useSelector(userSelector);
  const dispatch = useDispatch();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${initialUser.token}`,
        },
      };
      const { data } = await axios.get("/user/chat", config);
      console.log(data);
      dispatch(setChats(data));
    } catch (error) {
      toast.error(`Error in fetching Chats`);
      console.log(`Error in fetching chats ${error}`);
    }
  };

  console.log(chats);
  useEffect(() => {
    fetchChats();
  }, []);

  const getName = (users) => {
    const otherUser = users.find((obj) => obj._id !== initialUser.id);
    return otherUser;
  };

  return (
    <>
      <aside className="bg-gray-300 rounded-md p-2 m-3 h-[85vh]">
        <div className="usersContainer w-[385px] pl-1">
          {chats.length > 0 ? (
            chats.map((c) => {
              const user = getName(c.users);
              return <UserView searchedUser={user} />;
            })
          ) : (
            <p>No Chats found</p>
          )}
        </div>
      </aside>
    </>
  );
};

export default UserContainer;
