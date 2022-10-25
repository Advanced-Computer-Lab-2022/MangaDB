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
  const defaultState = {
    minValue: 0,
    maxValue: endValueExchange,
  };
  const [rangeState, dispatchRange] = useReducer(rangeReducer, defaultState);

  const minChangeHandler = (event) => {
    dispatchRange({ type: "MIN", value: +event.target.value });
  };
  const maxChangeHandler = (event) => {
    dispatchRange({ type: "MAX", value: +event.target.value });
  };

  return (
    <Fragment>
      <label>Price Filter</label>
      <div className="min-Value">
        <label htmlFor="min-price">min Price</label>
        <input
          id="min-price"
          type="number"
          value={rangeState.minValue.toString()}
          onChange={minChangeHandler}
        />
      </div>
      <div className="max-Value">
        <label htmlFor="max-price">max Price</label>
        <input
          id="max-price"
          type="number"
          value={rangeState.maxValue.toString()}
          onChange={maxChangeHandler}
        />
      </div>
    </Fragment>
  );
};
export default PriceFilter;
