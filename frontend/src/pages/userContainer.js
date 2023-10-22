import React from "react";
import UserView from "./userView";

const UserContainer = () => {
  return (
    <>
      <aside className=" bg-gray-300 rounded-md p-2 m-3 h-[85vh]">
        <div className="usersContainer  w-[385px] pl-1  ">
          <UserView />
        </div>
      </aside>
    </>
  );
};

export default UserContainer;
