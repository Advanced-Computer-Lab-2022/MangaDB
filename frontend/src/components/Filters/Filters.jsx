import { useReducer } from "react";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";
import SubjectFilter from "./SubjectFilter";
import Divider from "@mui/material/Divider";
import SecondaryButton from "../SecondaryButton";
import PrimaryButton from "../PrimaryButton";
import Modal from "../UI/Modal";

const Filters = (props) => {
  const ReducerFunction = (state, action) => {
    if (action.type === "SUBJECT") {
      const newSubject = {
        ...state,
        subjects: action.value,
      };
      props.onChange(newSubject)
      return newSubject
    } else if (action.type === "PRICE") {
      const newPrice=  {
        ...state,
        price: action.value,
      };
      props.onChange(newPrice)
      return newPrice
    } else if (action.type === "RATING") {
      const newRating= {
        ...state,
        rating: action.value,
      };
      props.onChange(newRating)
      return newRating
    } else if (action.type === "CLEAR") {
      return {
        subjects: [],
        price: null,
        rating: null,
      };
    }
  };
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
      <form className="p-4" onSubmit={onSubmitHandler}>
        <div className="grid grid-cols-3 pb-3 font-bold">
          <div></div>
          <div className="flex justify-center text-2xl">Filters</div>
          <div className="flex justify-end">
            <button className="hover:text-red-600 text-xl" onClick={props.onClick}>x</button>
          </div>
        </div>
        <Divider variant="middle" />
        <div className="py-4">
          <SubjectFilter
            onChange={subjectChangeHandler}
            options={props.options}
          />
        </div>
        <Divider variant="middle" />
        <div className="py-4">
          <PriceFilter
            onChange={priceChangeHandler}
            exchange={props.exchange}
          />
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
          <SecondaryButton type="submit" text="Confirm"></SecondaryButton>
        </div>
      </form>
    </Modal>
  );
};
export default Filters;
