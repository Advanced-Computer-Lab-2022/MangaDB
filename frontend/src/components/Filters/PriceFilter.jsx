import { Fragment } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#3970AC",
      darker: "#053e85",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});
const PriceFilter = (props) => {
  const endValueExchange = +props.exchange * 500;
  var minValue = props.defaultState ? props.defaultState.minValue : 0;
  var maxValue = props.defaultState
    ? props.defaultState.maxValue
    : endValueExchange;

  var checked = false;
  if(+minValue === 0 && +maxValue === 0){
    checked = true
  }
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

  const freeChangeHandler = (event) => {
    var range;
    if(event.target.checked){
      range = {
        minValue : 0,
        maxValue : 0
      }
    }
    else{
      range = {
        minValue: minValue,
        maxValue: 500,
      };
    }
   
    props.onChange(range);
  }

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
        <div>
          <label>Free</label>
          <ThemeProvider theme={theme}>
            <Checkbox
              color="primary"
              checked={checked}
              onChange={freeChangeHandler}
              inputProps={{ "aria-label": "controlled" }}
            />
          </ThemeProvider>
        </div>
      </div>
    </Fragment>
  );
};
export default PriceFilter;
