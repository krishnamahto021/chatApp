import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeUserFromGroupChat,
  userSelector,
} from "../redux/reducers/userReducer";
import axios from "axios";
import { toast } from "react-toastify";
import UserBadge from "./userBadge";

const UpdateGroupChat = () => {
  // const [updateGroupChat, setUpdateGroupChatForm] = useState(false);
  // const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [groupName, setGroupName] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { initialUser, selectedChat } = useSelector(userSelector);
  const dispatch = useDispatch();

  const handleDelete = async (chatId, userId) => {
    try {
      console.log(chatId, userId);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${initialUser.token}`,
        },
      };
      await axios.post(
        "/user/remove-user-group-chat",
        { chatId, userId },
        config
      );
      dispatch(removeUserFromGroupChat(userId));
      console.log(selectedChat.users);

      toast.success(`Deleted User Successfully!`);
    } catch (error) {
      toast.error(`Internal Server Error!`);
      console.log(`Error in deleting user ${error}`);
    }
  };

  const handleSearch = async (query) => {
    setSearch(query);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${initialUser.token}`,
        },
      };

      const { data } = await axios.get(
        `/user/search-user?search=${search}`,
        config
      );
      setSearchResult(data);
    } catch (error) {
      console.log(`error in finding user ${error}`);
    }
  };

  const handleSubmit = async () => {};
  return (
    <>
      <div className="modalWrapper fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.7)]"></div>
      <div className="form-container flex flex-col content-evenly fixed top-[15%] left-[35%] bg-gray-300 p-4 rounded-md shadow-2xl">
        <label>Name of Group Chat</label>
        <input
          className="p-2 m-2 rounded-md bg-gray-50 focus:border-transparent focus:outline-none"
          placeholder="Enter the new name of Group"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          required
        ></input>
        <label>Add Users</label>
        <input
          className="p-2 m-2 rounded-md bg-gray-50 focus:border-transparent focus:outline-none"
          placeholder="Search users to Add"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        ></input>

        <div className="searachedUser flex border-blue-200">
          {selectedChat.users ? (
            selectedChat.users.map((user) => {
              return (
                <>
                  <UserBadge
                    user={user}
                    key={user.id}
                    handleDelete={() =>
                      handleDelete(selectedChat._id, user._id)
                    }
                  />
                </>
              );
            })
          ) : (
            <p>NO users</p>
          )}
        </div>

        <div></div>

        <button
          className="p-3 ml-56 bg-violet-500 hover:bg-violet-600 rounded-xl text-white"
          type="submit"
          onClick={handleSubmit}
        >
          Create Group Chat
        </button>
      </div>
    </>
  );
};

export default UpdateGroupChat;
