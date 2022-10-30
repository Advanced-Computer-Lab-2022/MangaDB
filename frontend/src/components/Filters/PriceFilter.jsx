import { useReducer, Fragment } from "react";
const PriceFilter = (props) => {
  const endValueExchange = +props.exchange * 500;
  const rangeReducer = (state, action) => {
    var newRange;
    if (action.type === "MIN") {
      if (action.value <= state.maxValue) {
        newRange = {
          minValue: action.value,
          maxValue: state.maxValue,
        };
        props.onChange(newRange);
        return newRange;
      } else {
        newRange = {
          minValue: state.maxValue,
          maxValue: action.value,
        };
        props.onChange(newRange);
        return newRange;
      }
    } else if (action.type === "MAX") {
      if (action.value >= state.minValue) {
        newRange = {
          minValue: state.minValue,
          maxValue: action.value,
        };
        props.onChange(newRange);
        return newRange;
      } else {
        newRange = {
          minValue: action.value,
          maxValue: state.minValue,
        };
        props.onChange(newRange);
        return newRange;
      }
    }
  };
  var defaultState;
  if (props.defaultState) {
    defaultState = {
      minValue: props.defaultState.minValue,
      maxValue: props.defaultState.maxValue,
    };
  } else {
    defaultState = {
      minValue: 0,
      maxValue: endValueExchange,
    };
  }
  const [rangeState, dispatchRange] = useReducer(rangeReducer, defaultState);

  const minChangeHandler = (event) => {
    dispatchRange({ type: "MIN", value: +event.target.value });
  };
  const maxChangeHandler = (event) => {
    dispatchRange({ type: "MAX", value: +event.target.value });
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
            value={rangeState.minValue.toString()}
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
            value={rangeState.maxValue.toString()}
            onChange={maxChangeHandler}
          />
        </div>
      </div>
    </Fragment>
  );
};
export default PriceFilter;
