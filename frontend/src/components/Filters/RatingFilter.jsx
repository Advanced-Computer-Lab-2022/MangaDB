import { Fragment } from "react";
const RatingFilter = (props) => {
  const changeHandler = (event) => {
    props.onChange(event.target.value);
  };

  return (
    <Fragment>
      <div>
        <label htmlFor="medium-range" className="text-lg font-semibold">
          Rating
        </label>
      </div>
      <input
        id="medium-range"
        type="range"
        value={props.defaultState?props.defaultState:1}
        min="1"
        max="5"
        step="0.1"
        onChange={changeHandler}
        className="mb-2 w-full h-2 bg-lightBlue rounded-lg appearance-none cursor-pointer accent-darkBlue"
      ></input>
      <input
        className="w-20 mt-1 mb-3 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue "
        onChange={changeHandler}
        value={props.defaultState?props.defaultState:1}
      ></input>
      <div className="flex space-x-4"></div>
    </Fragment>
  );
};
export default RatingFilter;
