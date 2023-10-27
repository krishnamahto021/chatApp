import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChats, userSelector } from "../redux/reducers/userReducer";
import UserView from "./userView";
import axios from "axios";
import CreateGroupChatFrom from "./createGroupChatFrom";
import { createPortal } from "react-dom";

const UserContainer = () => {
  const { initialUser, chats } = useSelector(userSelector);
  const dispatch = useDispatch();
  const [toggleGroupChatForm, setToggleGroupChatForm] = useState(false);

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${initialUser.token}`,
        },
      };
      const { data } = await axios.get("/user/chat", config);
      dispatch(setChats(data));
    } catch (error) {
      // toast.error(`Error in fetching Chats`);
      console.log(`Error in fetching chats ${error}`);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const getName = (users) => {
    const otherUser = users.find((obj) => obj._id !== initialUser.id);
    return otherUser;
  };

  const toggleGroupChatFormFucntion = () => {
    console.log("hi");
    setToggleGroupChatForm(!toggleGroupChatForm);
  };

  return (
    <>
      <aside className="bg-gray-300 rounded-md p-2 m-3 h-[85vh]">
        <div>
          <button
            className="p-3 ml-56 bg-violet-500 hover:bg-violet-600 rounded-xl text-white"
            onClick={toggleGroupChatFormFucntion}
          >
            Create Group Chat
          </button>
        </div>
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
        {toggleGroupChatForm &&
          createPortal(
            <CreateGroupChatFrom
              toggleGroupChatFormFucntion={toggleGroupChatFormFucntion}
            />,
            document.querySelector(".modalContainer")
          )}
      </aside>
    </>
  );
};

export default UserContainer;
