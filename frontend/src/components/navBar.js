import React from "react";
import SearchBar from "../pages/search";
import { IoNotifications } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowProfile, userSelector } from "../redux/reducers/userReducer";
import UserProfile from "./userProfile";

const NavBar = () => {
  const { initialUser, showProfile } = useSelector(userSelector);
  const dispatch = useDispatch();
  return (
    <>
      <div className="navBar flex items-center justify-between flex-wrap ">
        <SearchBar />
        <div className="tracking-widest font-semibold text-lg -ml-2">
          Chat App
        </div>
        <div className="flex items-center justify-between gap-4 m-2">
          <IoNotifications className="font-bold text-2xl cursor-pointer" />
          <div
            className="user cursor-pointer"
            onClick={() => dispatch(toggleShowProfile(initialUser))}
          >
            <img
              src={initialUser.profileImage}
              alt={initialUser.name}
              className="w-8 h-8 rounded-full"
            ></img>
          </div>

          {showProfile ? <UserProfile /> : null}
        </div>
      </div>
    </>
  );
};

export default NavBar;
