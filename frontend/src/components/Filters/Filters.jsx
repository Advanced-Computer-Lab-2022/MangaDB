import { useReducer } from "react";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";
import SubjectFilter from "./SubjectFilter";
import Divider from "@mui/material/Divider";
import SecondaryButton from "../SecondaryButton";
import PrimaryButton from "../PrimaryButton";
import Modal from "../UI/Modal";
const Filters = (props) => {
  const defaultFilterState = {
    ...props.prevState,
  };
  const ReducerFunction = (state, action) => {
    if (action.type === "SUBJECT") {
      const newSubject = {
        ...state,
        subjects: action.value,
      };
      return newSubject;
    } else if (action.type === "PRICE") {
      const newPrice = {
        ...state,
        price: action.value,
      };
      return newPrice;
    } else if (action.type === "RATING") {
      const newRating = {
        ...state,
        rating: action.value,
      };
      return newRating;
    } else if (action.type === "CLEAR") {
      return {
        subjects: [],
        price: null,
        rating: null,
      };
    }
  };

  const [filterState, dispatchFilter] = useReducer(
    ReducerFunction,
    defaultFilterState
  );
  const onSubmitHandler = () => {
    var newFilterState;
    if (filterState.price) {
      if (filterState.price.minValue > filterState.price.maxValue) {
        newFilterState = {
          ...filterState,
          price: {
            minValue: filterState.price.maxValue,
            maxValue: filterState.price.minValue,
          },
        };
        props.onConfirm(newFilterState);
      }
      else{
        props.onConfirm(filterState);
      }
      
    } else props.onConfirm(filterState);
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
    <Modal onClick={props.onClick}>
      <div className="grid grid-cols-3 pb-3 font-bold">
        <div></div>
        <div className="flex justify-center text-2xl">Filters</div>
        <div className="flex justify-end">
          <button
            className="hover:text-red-600 text-xl"
            onClick={props.onClick}
          >
            x
          </button>
        </div>
      </div>
      <Divider variant="middle" />
      <div className="py-4">
        <SubjectFilter
          defaultState={filterState.subjects}
          onChange={subjectChangeHandler}
          options={props.options}
        />
      </div>
      <Divider variant="middle" />
      <div className="py-4">
        <PriceFilter
          defaultState={filterState.price}
          onChange={priceChangeHandler}
          exchange={props.exchange}
        />
      </div>
      <Divider variant="middle" />
      <div className="py-4">
        <RatingFilter
          defaultState={filterState.rating}
          onChange={ratingChangeHandler}
        />
      </div>
      <Divider variant="middle" />
      <div className="controls flex justify-end space-x-2 mt-2">
        <PrimaryButton
          className=" rounded-md  "
          text="Clear Filters"
          onClick={clearHandler}
        ></PrimaryButton>
        <SecondaryButton
          onClick={onSubmitHandler}
          text="Confirm"
        ></SecondaryButton>
      </div>
    </Modal>
  );
};
export default Filters;
