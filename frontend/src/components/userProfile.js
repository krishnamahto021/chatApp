import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  logOutUser,
  toggleShowProfile,
  userSelector,
} from "../redux/reducers/userReducer";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { initialUser } = useSelector(userSelector);
  const { showProfile } = useSelector(userSelector);

  return (
    <>
      {showProfile ? (
        <div className="profile-info absolute w-[500px] h-[500px] bg-slate-100 m-5 p-3 rounded-md z-30 flex flex-col items-center justify-center transition duration-1000 ease-in-out right-0">
          <span
            className="absolute top-3 right-3 cursor-pointer text-lg font-bold"
            onClick={() => dispatch(toggleShowProfile())}
          >
            X
          </span>
          <span className="text-center text-2xl">{initialUser.name}</span>
          <img
            src={initialUser.profileImage}
            alt={initialUser.name}
            className="w-[350px] h-[350px] rounded-full m-1"
          ></img>
          <span>Email: {initialUser.email}</span>

          <button
            onClick={() => dispatch(logOutUser())}
            className="bg-[#3498db] rounded-md p-4 text-white text-lg m-3"
          >
            Log Out
          </button>
        </div>
      ) : null}
    </>
  );
};

export default UserProfile;
