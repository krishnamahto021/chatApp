import axios from "axios";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedUsers, userSelector } from "../redux/reducers/userReducer";
import UserView from "./userView";

const SearchBar = () => {
  const [toggleSearch, setToggleSearch] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { searchedUsers, initialUser } = useSelector(userSelector);

  const handleSearch = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${initialUser.token}`,
        },
      };
      const { data } = await axios.get(
        `/user/search-user?search=${search}`,
        config
      );
      dispatch(setSearchedUsers(data));
    } catch (error) {
      console.log(`error in searching ${error}`);
      toast.error("Internal server Error!");
    }
  };

 

  return (
    <>
      <div
        className="searchContainer m-3 flex items-center "
        onClick={() => setToggleSearch(!toggleSearch)}
      >
        <FiSearch className="text-xl -ml-2 bg-none cursor-pointer" />
      </div>
      {toggleSearch ? (
        <div className="bg-slate-200 absolute w-80 p-2 top-0 transition duration-200 ease-in-out h-[100%]">
          <div className="flex gap-3">
            <FiSearch
              className="text-xl bg-none cursor-pointer mt-1"
              onClick={() => setToggleSearch(!toggleSearch)}
            />
            <div>
              <input
                type="text"
                placeholder="Search User ...."
                className="ml-2 focus:border-transparent focus:outline-none bg-inherit placeholder:text-black border-b border-black"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                required
              ></input>
            </div>
            <button
              className="cursor-pointer bg-gray-600 h-7 text-center w-10 text-sm text-white rounded-sm "
              onClick={handleSearch}
            >
              Go
            </button>
            <button
              className="text-2xl font-semibold "
              onClick={() => setToggleSearch(!toggleSearch)}
            >
              X
            </button>
          </div>
          {searchedUsers.length > 0 ? (
            searchedUsers.map((searchedUser) => {
              return (
                <div key={searchedUser.id}>
                  <UserView searchedUser={searchedUser} />
                </div>
              );
            })
          ) : (
            <span>No users found...</span>
          )}
        </div>
      ) : null}
    </>
  );
};

export default SearchBar;
