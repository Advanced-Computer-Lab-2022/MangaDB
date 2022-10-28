import { useReducer } from "react";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";
import SubjectFilter from "./SubjectFilter";
import Divider from "@mui/material/Divider";
import SecondaryButton from "../SecondaryButton";
import PrimaryButton from "../PrimaryButton";
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
  return (
    <form className="p-4" onSubmit={onSubmitHandler}>
      <div className="grid grid-cols-3 pb-3 font-bold">
        <div></div>
        <div className="flex justify-center text-2xl">
          Filters
        </div>
        <div className="flex justify-end">
          <button className="hover:text-red-600 text-xl">x</button>
        </div>
      </div>
      <Divider variant="middle" />
      <div className="py-4">
      <SubjectFilter onChange={subjectChangeHandler} options={props.options} />
      </div>
      <Divider variant="middle" />
      <div className="py-4">
      <PriceFilter onChange={priceChangeHandler} exchange={props.exchange} />
      </div>
      <Divider variant="middle" />
      <div className="py-4">
      <RatingFilter onChange={ratingChangeHandler} />
      </div>
      <Divider variant="middle" />
      <div className="controls flex justify-end space-x-2 mt-2">
        <PrimaryButton
          className=" rounded-md  "
          text="Clear Filters"
          onclick={clearHandler}
        ></PrimaryButton>
        <SecondaryButton text="Confirm"></SecondaryButton>
      </div>
    </form>
  );
};
export default Filters;
