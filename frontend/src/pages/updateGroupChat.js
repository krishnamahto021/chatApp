import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserToGroup,
  removeUserFromGroupChat,
  userSelector,
} from "../redux/reducers/userReducer";
import axios from "axios";
import { toast } from "react-toastify";
import UserBadge from "./userBadge";
import UserView from "./userView";

const UpdateGroupChat = () => {
  // const [updateGroupChat, setUpdateGroupChatForm] = useState(false);
  const { initialUser, selectedChat } = useSelector(userSelector);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [groupName, setGroupName] = useState(selectedChat.chatName);
  const [searchResult, setSearchResult] = useState([]);
  const dispatch = useDispatch();
  const handleDelete = async (chatId, userId) => {
    try {
      if (
        selectedChat.groupAdmin._id !== initialUser.id &&
        userId !== initialUser.id
      ) {
        toast.error(`Only Admins can do changes `);
        return;
      }
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
      if (userId !== initialUser.id) {
        toast.success(`Deleted User Successfully!`);
      } else {
        toast.success(`Left Group`);
      }
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

 const handleGroup = async (userToAdd) => {
   if (selectedChat.groupAdmin._id !== initialUser.id) {
     toast.error(`Only Admins can make changes`);
     return;
   }

   // Check if userToAdd._id exists in the selectedChat.users array
   if (selectedChat.users.some((user) => user._id === userToAdd._id)) {
     toast.error(`User Already Exists`);
   } else {
     setSelectedUsers([...selectedUsers, userToAdd]);
     dispatch(addUserToGroup(userToAdd));
     toast.success(`Added User`);
   }
 };


  const handleSubmit = async () => {
    try {
      console.log(selectedChat.groupAdmin._id, initialUser.id);
      if (selectedChat.groupAdmin._id !== initialUser.id) {
        toast.error(`Only Admins can do changes `);
        return;
      }
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${initialUser.token}`,
        },
      };
      await axios.post(
        "/user/rename-group-chat",
        { chatId: selectedChat._id, chatName: groupName },
        config
      );
      await axios.post(
        "/user/add-user-group-chat",
        { chatId: selectedChat._id, userIds: selectedUsers },
        config
      );
      toast.success(`Group Chat updated Successfully !`);
    } catch (error) {
      toast.error(`Error in updating Chat`);
      console.log(`Error in updating Chat ${error}`);
    }
  };
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

        {searchResult.length > 0 ? (
          searchResult?.slice(0, 4).map((user) => {
            return (
              <UserView
                key={user.id}
                searchedUser={user}
                handleFunction={() => handleGroup(user)}
              />
            );
          })
        ) : (
          <p>NO users..</p>
        )}

        <div className="selectedChatUsers flex border-blue-200">
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

        <div className="buttonContainer flex">
          <button
            className="p-3 ml-56 bg-red-500 hover:bg-red-600 rounded-xl text-white"
            type="submit"
            onClick={() => handleDelete(selectedChat._id, initialUser.id)}
          >
            Leave Group
          </button>
          <button
            className="p-3 ml-56 bg-violet-500 hover:bg-violet-600 rounded-xl text-white"
            type="submit"
            onClick={handleSubmit}
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateGroupChat;
