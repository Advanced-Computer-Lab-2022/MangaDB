import React from "react";

const Search = (props) => {
  return (
    <div className={` left-3 right-3 ml-auto mr-auto min-w-[800px] max-w-4xl ${props.className} `}>
      <form>
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only "
        >
          Search
        </label>
        <div class="relative">
          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="outline-none block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-300 focus:border-blue-300  "
            placeholder="Search by course name, category, or instructor"
            required
          ></input>
          <button
            type="submit"
            class="text-white absolute right-2.5 bottom-2.5 bg-primaryBlue hover:bg-blue-800 hover:ease-in-out  ease-in-out focus:ring-4 focus:ease-in-out duration-300 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};
export default Search;
