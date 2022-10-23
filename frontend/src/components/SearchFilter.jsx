import React from "react";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const SearchFilter = () => {
  return (
    <div className="flex rounded-full justify-center items-center shadow-md w-fit h-16">
      <form>
        <input
          type="text"
          className="w-64 min-h-full focus:h-16 px-4"
          name="search"
          placeholder="Search for courses"
        />

        <button type="submit" className=" px-4">
          <SearchRoundedIcon
            type="submit"
            fontSize="small"
            className="opacity-50"
          />
        </button>

        {/* <TuneRoundedIcon /> */}
        {/* <input type="submit"  /> */}
      </form>
    </div>
  );
};

export default SearchFilter;
