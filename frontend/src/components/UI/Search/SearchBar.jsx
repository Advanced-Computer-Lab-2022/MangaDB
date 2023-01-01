import { useRef } from "react";
import React from "react";
import SecondaryButton from "../SecondaryButton";
import {useNavigate} from "react-router-dom"

const SearchBar = (props) => {
  const navigate = useNavigate();
  const inputRef = useRef();
  if (!props.prevSearchState && props.prevmyCoursesState) {
    inputRef.current.value = "";
  }
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const role = localStorage.getItem("role");
    if (role !== "INSTRUCTOR" && role !== "ADMIN") {
    navigate(`/searchresults`, {state:inputRef.current.value});
  };
  }
  return (
    <div
      className={` right-3 w-[60vw] max-w-4xl ${props.className} `}
    >
      <form onSubmit={onSubmitHandler}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only "
        >
          Search
        </label>
        <div className="flex w-full relative">
          <div className="flex inset-y-0 left-0 items-center pl-3 pointer-events-none absolute">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="outline-none p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-veryLightBlue focus:border-veryLightBlue  "
            placeholder="Search by course name, category, or instructor"
            ref={inputRef}
          >
            
          </input>
          <div className="mt-2 absolute right-3">
          <SecondaryButton
            className=""
            text="Search"
            type="submit"
          />
          </div>
          
        </div>
      </form>
    </div>
  );
};
export default SearchBar;
