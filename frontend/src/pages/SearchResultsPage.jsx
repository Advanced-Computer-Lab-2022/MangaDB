import axios from "axios";
import { Fragment, useState, useEffect, useReducer } from "react";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import Filters from "../components/Filters/Filters";
import SecondaryButton from "../components/SecondaryButton";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";

const options = [
  { id: 1, name: "Web Development" },
  { id: 2, name: "Machine Learning" },
  { id: 3, name: "Computer Science" },
  { id: 4, name: "Database Administration" },
  { id: 5, name: "Data Analytics" },
];

const icon = <TuneOutlinedIcon className="ml-2" />;
const SearchResultsPage = (props) => {
  const defaultState = {
    displayedCourse: [],
    search: "",
    filters: {
      price: null,
      subjects: [],
      rating: null,
    },
  };
  const ReducerFunction = (state, action) => {
    if (action.type === "SEARCH") {
      const newState = { ...state, search: action.value };
      return newState;
    }
    if (action.type === "FILTER") {
        const newState = { ...state, filters: action.value };
        return newState;
    }
  };
  const [searchState, dispatchSearch] = useReducer(
    ReducerFunction,
    defaultState
  );
  const [showFilters, setShowFilters] = useState(false);
  const showFiltersHandler = () => {
    setShowFilters(true);
  };
  const hideFiltersHandler = () => {
    setShowFilters(false);
  };
  const searchBarChangeHandler = (event) => {
    dispatchSearch({ type: "SEARCH", value: event.target.value });
  };
  const filterChangeHandler = (newFilter) => {
    dispatchSearch({ type: "FILTER", value: newFilter });
  };
  console.log(searchState)
  return (
    <Fragment>
      <NavBar />
      <div className="flex justify-center space-x-4 mb-3">
        <Search onChange={searchBarChangeHandler} className="ml-4" />
        <SecondaryButton
          className="mr-4 w-25"
          text="Filter"
          icon={icon}
          onClick={showFiltersHandler}
        ></SecondaryButton>
      </div>
      {showFilters && (
        <Filters
          onChange={filterChangeHandler}
          exchange={1}
          options={options}
          onClick={hideFiltersHandler}
        />
      )}
    </Fragment>
  );
};
export default SearchResultsPage;
