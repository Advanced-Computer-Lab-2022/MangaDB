import { Fragment, useState } from "react";
const RatingFilter = (props) => {
  const [rateValue, setRateValue] = useState(0);
  const changeHandler = (event) => {
    props.onChange(event.target.value);
    setRateValue(event.target.value);
  };

  return (
    <Fragment>
      <label
        htmlFor="medium-range"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        Rating Filter
      </label>
      <input
        id="medium-range"
        type="range"
        value={rateValue}
        min="0"
        max="5"
        step="0.1"
        onChange={changeHandler}
        className="mb-6 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      ></input>
      <input onChange={changeHandler} value={rateValue}></input>
      <div className="flex space-x-4"></div>
    </Fragment>
  );
};
export default RatingFilter;
