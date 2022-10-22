import countryList from "react-select-country-list";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Modal from "./UI/Modal";
const CountrySelector = (props) => {
  const countryLabels = countryList().getLabels();
  const countryCodes = countryList().getValues();
  var countries = [];
  for (var i = 0; i < countryLabels.length; i++) {
    countries[i] = {
      label: countryLabels[i],
      code: countryCodes[i],
    };
  }
  const CountryHandler = (event) => {
    const indexofCountry = event.target.outerText.split("(");
    props.pictureHandler(indexofCountry[1].substring(0,2));
  };
  return (
    <Modal onClick = {props.onClick}>
    <label>please select your country</label>
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 300 }}
      options={countries}
      autoHighlight
      getOptionLabel={(option) => option.label}
      onChange={CountryHandler}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.label} ({option.code})
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a country"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  </Modal>
  );
};
export default CountrySelector;
