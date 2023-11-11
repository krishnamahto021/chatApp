import React from "react";

const UserBadge = (props) => {
  const { handleDelete, user } = props;
  return (
    <>
      <div className="flex items-center justify-between w-24 gap-4 bg-violet-400 p-2 ml-4 mb-4   rounded-xl cursor-pointer hover:bg-violet-500 sm:w-24">
        <p className="">{user.name}</p>
        <button onClick={handleDelete}>X</button>
      </div>
    </>
  );
};

export default UserBadge;
