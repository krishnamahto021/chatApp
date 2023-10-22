import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  return (
    <>
      <div className="searchContainer m-3 flex items-center">
        <FiSearch className="text-xl -ml-2 bg-none" />
        <input
          type="text"
          placeholder="Search User ...."
          className="ml-2 pl-2 focus:border-transparent focus:outline-none bg-inherit placeholder:text-black border-b border-black"
        ></input>
      </div>
    </>
  );
};

export default SearchBar;
