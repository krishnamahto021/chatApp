import React from "react";

const CreateGroupChatFrom = (props) => {
  const { toggleGroupChatFormFucntion } = props;
  return (
    <>
      <div
        className="modalWrapper fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.7)]"
        onClick={toggleGroupChatFormFucntion}
      ></div>
      <div className="form-container flex flex-col content-evenly fixed top-[35%] left-[35%] bg-gray-300 p-4 rounded-md shadow-2xl">
        <label>Name of Group Chat</label>
        <input
          className="p-2 m-2 rounded-md bg-gray-50 focus:border-transparent focus:outline-none"
          placeholder="Enter the name of Group"
        ></input>
        <label>Add Users</label>
        <input
          className="p-2 m-2 rounded-md bg-gray-50 focus:border-transparent focus:outline-none"
          placeholder="Search users to Add"
        ></input>
        <button
          className="p-3 ml-56 bg-violet-500 hover:bg-violet-600 rounded-xl text-white"
          onClick={toggleGroupChatFormFucntion}
        >
          Create Group Chat
        </button>
      </div>
    </>
  );
};

export default CreateGroupChatFrom;
