import { Fragment } from "react";
const PriceFilter = (props) => {
  const endValueExchange = +props.exchange * 500;
  var minValue = props.defaultState ? props.defaultState.minValue : 0;
  var maxValue = props.defaultState
    ? props.defaultState.maxValue
    : endValueExchange;
  const minChangeHandler = (event) => {
    const range = {
      minValue: +event.target.value,
      maxValue: maxValue,
    };
    props.onChange(range);
  };
  const maxChangeHandler = (event) => {
    const range = {
      minValue: minValue,
      maxValue: +event.target.value,
    };
    props.onChange(range);
  };

  return (
    <Fragment>
      <div>
        <label className="text-lg font-semibold">Price </label>
      </div>
      <div className="flex justify-around mb-4">
        <div className="min-Value space-x-4">
          <label htmlFor="min-price">Min</label>
          <input
            className="w-20 mt-1 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
            id="min-price"
            type="number"
            value={minValue.toString()}
            onChange={minChangeHandler}
          />
        </div>
        <div className="max-Value space-x-4">
          <label htmlFor="max-price">Max</label>
          <input
            className="w-20 mt-1 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
            id="max-price"
            type="number"
            value={maxValue.toString()}
            onChange={maxChangeHandler}
          />
        </div>
      </div>
    </Fragment>
  );
};
export default PriceFilter;
