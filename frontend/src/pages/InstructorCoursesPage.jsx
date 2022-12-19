import { Fragment, useState, useEffect, useReducer } from "react";
import axios from "axios";
import Table from "../components/Table/Table";
import NavBar from "../components/UI/NavBar/NavBar";
import InstructorControls from "../components/Table/InstructorControls";
import Filters from "../components/Filters/Filters";
import TableListViewCard from "../components/Table/TableListViewCard";
const options = [
  { id: 1, name: "Web Development" },
  { id: 2, name: "Machine Learning" },
  { id: 3, name: "Computer Science" },
  { id: 4, name: "Database Administration" },
  { id: 5, name: "Data Analysis" },
];

const IntructorCoursePage = (props) => {
  const defaultState = {
    displayedCourses: [],
    search: "",
    filters: {
      price: null,
      subjects: [],
      rating: null,
    },
    myCourses: false,
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
    if (action.type === "MYCOURSES") {
      const newState = { ...defaultState, myCourses: !state.myCourses };
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
  const viewMyCoursesHandler = () => {
    dispatchSearch({ type: "MYCOURSES" });
  };
  useEffect(() => {
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
    if (!searchState.myCourses) {
      axios.get("http://localhost:3000/course/" + param ,{
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'content-type': 'text/json'
}}).then((res) => {
        dispatchSearch({ type: "COURSES", value: res.data.courses });
      });
    } else {
      axios
        .get(
          "http://localhost:3000/instructor/searchCourses" +
            param ,{
              headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'content-type': 'text/json'
    }}
        )
        .then((res) => {
          dispatchSearch({ type: "COURSES", value: res.data.courses });
        });
    }
  }, [searchState.search, searchState.filters, searchState.myCourses]);
  var rows = searchState.displayedCourses.map((course) => {
    return {
      courseId: course._id,
      courseTitle: course.courseTitle,
      instructorName: course.instructorName,
      subject: course.subject,
      rating: course.rating,
      level: course.level,
      price: course.coursePrice,
      discountedPrice: course.discountedPrice,
      totalMins: course.totalMins,
      discount: course.discount,
    };
  });

  var cards = rows.map((row) => {
    return (
      <TableListViewCard
        title={row.courseTitle}
        instructor={row.instructorName}
        subject={row.subject}
        totalHours={Math.round(+row.totalMins / 60)}
        rating={row.rating}
        level={row.level}
        price={row.price}
        discount={row.discount}
        discountedPrice={row.discountedPrice}
      />
    );
  });

  return (
    <Fragment>
      <NavBar />
      {showFilters && (
        <Filters
          prevState={searchState.filters}
          onConfirm={filtersChangeHandler}
          exchange={1}
          options={options}
          onClick={hideFiltersHandler}
        />
      )}
      <InstructorControls
        onChange={searchBarChangeHandler}
        onShowFilters={showFiltersHandler}
        onCoursesClick={viewMyCoursesHandler}
        prevmyCoursesState={searchState.myCourses}
        prevSearchState={searchState.search}
      />
      <div className="hidden xl:block">
        <Table rows={rows} />
      </div>
      <div className="flex justify-around flex-wrap xl:hidden">{cards}</div>
    </Fragment>
  );
};
export default IntructorCoursePage;
