import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChats, userSelector } from "../redux/reducers/userReducer";
import axios from "axios";
import { toast } from "react-toastify";
import UserView from "./userView";
import UserBadge from "./userBadge";

const CreateGroupChatFrom = (props) => {
  const { toggleGroupChatFormFucntion } = props;
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { initialUser, chats } = useSelector(userSelector);
  const dispatch = useDispatch();

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

  const handleDelete = async (deletedUser) => {
    setSelectedUsers(
      selectedUsers.filter((sel) => sel._id !== deletedUser._id)
    );
    toast.success(`Deleted User !`);
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast.error(`User Already Exists`);
    } else {
      setSelectedUsers([...selectedUsers, userToAdd]);
      toast.success(`Added User!`);
    }
  };

  const handleSubmit = async () => {
    if (!selectedUsers || !groupName) {
      toast.error(`Please all the the fields`);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${initialUser.token}`,
        },
      };
      const { data } = await axios.post(
        "/user/create-group-chat",
        {
          name: groupName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      dispatch(setChats(data));
      toast.success("Group Chat Created Successfully!");
      toggleGroupChatFormFucntion();
    } catch (error) {
      console.log(`Error in creating group Chat ${error}`);
      toast.error(`Internal Server Error!`);
    }
  };

  return (
    <>
      <div
        className="modalWrapper fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.7)]"
        onClick={toggleGroupChatFormFucntion}
      ></div>
      <div className="form-container w-[90%] flex flex-col content-evenly fixed top-[15%] left-[6%] bg-gray-300 p-4 rounded-md shadow-2xl md:left-[30%] md:w-[60%]">
        <label>Name of Group Chat</label>
        <input
          className="p-2 m-2 rounded-md bg-gray-50 focus:border-transparent focus:outline-none"
          placeholder="Enter the name of Group"
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

        <div className="searachedUser  border-blue-200 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ">
          {selectedUsers ? (
            selectedUsers.map((user) => {
              return (
                <>
                  <UserBadge
                    user={user}
                    key={user.id}
                    handleDelete={() => handleDelete(user)}
                  />
                </>
              );
            })
          ) : (
            <p>NO users</p>
          )}
        </div>
        {/* show only first four result */}
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
          <p>No users Searched..</p>
        )}

        <button
          className="p-3  bg-violet-500 hover:bg-violet-600 rounded-xl text-white w-fit"
          type="submit"
          onClick={handleSubmit}
        >
          Create Group Chat
        </button>
      </div>
    </>
  );
};

export default CreateGroupChatFrom;
