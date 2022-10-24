import { useReducer } from "react";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";
import SubjectFilter from "./SubjectFilter";
import Divider from "@mui/material/Divider";
const ReducerFunction = (state, action) => {
  if (action.type === "SUBJECT") {
    return {
      ...state,
      subjects: action.value,
    };
  } else if (action.type === "PRICE") {
    return {
      ...state,
      price: action.value,
    };
  } else if (action.type === "RATING") {
    return {
      ...state,
      rating: action.value,
    };
  } else if (action.type === "CLEAR") {
    return {
      subjects: [],
      price: null,
      rating: null,
    };
  }
};
const Filters = (props) => {
  const defaultFilterState = {
    subjects: [],
    price: null,
    rating: null,
  };
  const [filterState, dispatchFilter] = useReducer(
    ReducerFunction,
    defaultFilterState
  );
  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(filterState);
  };
  const subjectChangeHandler = (Array) => {
    dispatchFilter({ type: "SUBJECT", value: Array });
  };
  const priceChangeHandler = (Range) => {
    dispatchFilter({ type: "PRICE", value: Range });
  };
  const ratingChangeHandler = (Rating) => {
    dispatchFilter({ type: "RATING", value: Rating });
  };

  const clearHandler = () => {
    dispatchFilter({ type: "CLEAR" });
  };
  return(
  <form onSubmit={onSubmitHandler}>
    <SubjectFilter onChange={subjectChangeHandler} options={props.options} />
    <Divider variant="middle" />
    <PriceFilter onChange={priceChangeHandler} exchange={props.exchange} />
    <Divider variant="middle" />
    <RatingFilter onChange={ratingChangeHandler} />
    <Divider variant="middle" />
    <div className="controls">
      <button type="button" onClick={clearHandler}>
        Clear Filters
      </button>
      <button type="submit">Confirm</button>
    </div>
  </form>
  )
};
export default Filters;
