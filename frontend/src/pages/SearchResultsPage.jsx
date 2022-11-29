import axios from "axios";
import { Fragment, useState, useEffect, useReducer } from "react";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import Filters from "../components/Filters/Filters";
import SecondaryButton from "../components/SecondaryButton";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import CourseCardListView from "../components/Course/CourseCardListView";
import CourseCard from "../components/Course/CourseCard"
const options = [
  { id: 1, name: "Web Development" },
  { id: 2, name: "Machine Learning" },
  { id: 3, name: "Computer Science" },
  { id: 4, name: "Database Administration" },
  { id: 5, name: "Data Analysis" },
];

const icon = <TuneOutlinedIcon className="ml-2" />;
const SearchResultsPage = (props) => {
  const defaultState = {
    displayedCourses: [],
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
    if (action.type === "COURSES") {
      const newState = { ...state, displayedCourses: action.value };
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
  const searchBarChangeHandler = (searchValue) => {
    dispatchSearch({ type: "SEARCH", value: searchValue });
  };
  const filtersChangeHandler = (newFilter) => {
    dispatchSearch({ type: "FILTER", value: newFilter });
    setShowFilters(false);
  };

  useEffect(() =>{
    var param = "";
    if (searchState.search !== "")
      param = param + "?search=" + searchState.search;

    for (var i = 0; i < searchState.filters.subjects.length; i++) {
      for (var j = 0; j < options.length; j++) {
        if (options[j].id === searchState.filters.subjects[i]) {
          param = param + (param ? "&" : "?") + "subject=" + options[j].name;
        }
      }
    }
    if (searchState.filters.rating !== null)
      param =
        param + (param ? "&" : "?") + "rating=" + searchState.filters.rating;
    if (searchState.filters.price !== null) {
      param =
        param +
        (param ? "&" : "?") +
        "minPrice=" +
        searchState.filters.price.minValue;
      param =
        param +
        (param ? "&" : "?") +
        "maxPrice=" +
        searchState.filters.price.maxValue;
    }
    axios.get("http://localhost:3000/course/" + param).then((res) => {
      dispatchSearch({ type: "COURSES", value: res.data.courses });
    });
  },[searchState.search,searchState.filters])
  var coursesListView;
  var coursesCardsView;
  if (searchState.displayedCourses.length === 0) {
    coursesListView = <div className="text-xl font-semibold mt-16">No Courses Found.</div>;
    coursesCardsView = <div className="text-xl font-semibold mt-16">No Courses Found.</div>;
  } else {
    coursesListView = searchState.displayedCourses.map((course) => {
      return (
        <CourseCardListView
        duration={course.totalHours}
        title={course.courseTitle}
        instructorName={course.instructorName}
        subject={course.subject}
        level="Advanced"
        description={course.courseDescription}
        coursePrice={course.coursePrice}
        discountedPrice={course.discountedPrice}
        discount={course.discount}
        rating={course.rating}
        // currencySymbol={currencySymbol}
        ></CourseCardListView>
      );
    });
    coursesCardsView = searchState.displayedCourses.map((course) => {
      return (     
        <CourseCard
          duration={course.totalHours}
          title={course.courseTitle}
          instructorName={course.instructorName}
          subject={course.subject}
          level="Advanced"
          coursePrice={course.coursePrice}
          discountedPrice={course.discountedPrice}
          discount={course.discount}
          rating={course.rating}
          currencySymbol="$"
        ></CourseCard>
      );
    });
  }
  return (
    <Fragment>
      <NavBar />
      <div className="flex justify-center space-x-4 mb-3 items-center">
        <Search
          onChange={searchBarChangeHandler}
          className="ml-4"
        />
        <SecondaryButton
          className="mr-4 w-25 h-11"
          text="Filter"
          icon={icon}
          onClick={showFiltersHandler}
        ></SecondaryButton>
      </div>
      {showFilters && (
        <Filters
          prevState={searchState.filters}
          onConfirm={filtersChangeHandler}
          exchange={1}
          options={options}
          onClick={hideFiltersHandler}
        />
      )}

      <div className="flex flex-col gap-y-4 mb-4">
        <div className="font-bold text-2xl ml-24">Results:</div>
        <div className="flex-col items-center gap-y-4 hidden lg:flex">{coursesListView}</div>
        <div className="flex justify-around flex-wrap lg:hidden">{coursesCardsView}</div>
      </div>
    </Fragment>
  );
};
export default SearchResultsPage;
