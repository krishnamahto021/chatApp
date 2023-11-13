import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setChats,
  setSelectedChat,
  toggleShowSideBar,
  userSelector,
} from "../redux/reducers/userReducer";
import UserView from "./userView";
import axios from "axios";
import CreateGroupChatFrom from "./createGroupChatFrom";
import { createPortal } from "react-dom";
import { RotatingLines } from "react-loader-spinner";
const UserContainer = () => {
  const { initialUser, chats, showSideBar } = useSelector(userSelector);
  const dispatch = useDispatch();
  const [toggleGroupChatForm, setToggleGroupChatForm] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    fetchChats();
    setLoading(false);
  }, []);

  const getName = (chat) => {
    if (chat.isGroupChat) {
      // If it's a group chat without an image, add a default image
      return {
        ...chat,
        profileImage: "https://cdn-icons-png.flaticon.com/512/2352/2352167.png",
        name: chat.chatName,
      };
    } else {
      if (chat.users === undefined) {
        return;
      }
      let users = chat.users;
      const otherUser = users.find((obj) => obj._id !== initialUser.id);
      return otherUser;
    }
  };

  const toggleShowSideBarFunction = () => {
    const isSmallScreen = window.innerWidth < 768;

    // Only toggle the sidebar on small screens
    if (isSmallScreen) {
      dispatch(toggleShowSideBar());
    }
  };

  const toggleGroupChatFormFucntion = () => {
    setToggleGroupChatForm(!toggleGroupChatForm);
  };

  const setSelectedChatFunction = (chat) => {
    dispatch(setSelectedChat(chat));
  };
  return (
    <>
      <>
        {loading ? (
          <RotatingLines />
        ) : (
          <aside
            className={`bg-gray-300 rounded-md p-2 m-3 h-[85vh]  ${
              showSideBar ? "hidden" : "block"
            } w-screen   md:w-[40vw] lg:w-[30vw] xl:w-[25vw] overflow-y-scroll scrollbar-thin`}
          >
            <div>
              <button
                className="p-3 ml-auto bg-violet-500 hover:bg-violet-600 rounded-xl text-white "
                onClick={toggleGroupChatFormFucntion}
              >
                Create Group Chat
              </button>
            </div>
            <div
              className="usersContainer  pl-1 w-[90%]  "
              onClick={toggleShowSideBarFunction}
            >
              {chats.length > 0 ? (
                chats.map((c, index) => {
                  const user = getName(c);
                  return (
                    <UserView
                      key={index}
                      searchedUser={user}
                      setSelectedChat={() => setSelectedChatFunction(c)}
                    />
                  );
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
        )}
      </>
    </>
  );
};

export default UserContainer;
