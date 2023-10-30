import React from "react";

const UserMessageForm = () => {
  return (
    <div className="inputContainer fixed bottom-14 gap-9 flex  content-stretch ">
      <input
        placeholder="Type your message ... "
        className="inputFeild  rounded-xl p-2 w-[60rem] focus:border-transparent focus:outline-none"
        required
      ></input>
      <button className="sendButton bg-violet-500 hover:bg-violet-600 text-white rounded-lg p-2 ">
        Send
      </button>
    </div>
  );
};

export default UserMessageForm;
