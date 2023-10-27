import React from "react";

const UserBadge = (props) => {
  const { handleDelete, user } = props;
  return (
    <>
      <div className="flex gap-4 bg-violet-400 p-2 text-xl m-2 rounded-xl cursor-pointer hover:bg-violet-500">
        <p className="">{user.name}</p>
        <button onClick={handleDelete}>X</button>
      </div>
    </>
  );
};

export default UserBadge;
