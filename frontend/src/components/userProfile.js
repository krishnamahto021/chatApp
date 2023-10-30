import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  logOutUser,
  toggleShowProfile,
  userSelector,
} from "../redux/reducers/userReducer";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { initialUser, showUserProfile } = useSelector(userSelector);

  return (
    <>
      <div className="profile-info absolute w-[500px] h-[500px] bg-slate-100 m-5 p-3 rounded-md  flex flex-col items-center justify-center transition duration-1000 ease-in-out -top-4 -right-4">
        <span
          className="absolute top-3 right-3 cursor-pointer text-lg font-bold"
          onClick={() => dispatch(toggleShowProfile())}
        >
          X
        </span>
        <span className="text-center text-2xl">{showUserProfile.name}</span>
        <img
          src={showUserProfile.profileImage}
          alt={showUserProfile.name}
          className="w-[350px] h-[350px] rounded-full m-1"
        ></img>
        <span>Email: {showUserProfile.email}</span>

        {initialUser._id === showUserProfile._id ? (
          <button
            onClick={() => dispatch(logOutUser())}
            className="bg-[#3498db] rounded-md p-4 text-white text-lg m-3"
          >
            Log Out
          </button>
        ) : null}
      </div>
    </>
  );
};

export default UserProfile;
