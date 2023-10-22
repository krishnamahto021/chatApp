import React from "react";
import UserView from "./userView";

const UserContainer = () => {
  return (
    <>
      <aside>
        <div className="usersContainer bg-slate-50  w-[385px] pl-1">
          <UserView />
        </div>
      </aside>
    </>
  );
};

export default UserContainer;
