import countryList from "react-select-country-list";
import { useState } from "react";
import CountrySelector from "./CountrySelector";
const CountryManager = () => {
  const defaultValue = countryList().getValue("United States");
  const [selectedCountry, setSelectedCountry] = useState(defaultValue);
  const [isClicked, setIsClicked] = useState(false);
  const countryLabels = countryList().getLabels();
  const countryCodes = countryList().getValues();
  var countries = [];
  for (var i = 0; i < countryLabels.length; i++) {
    countries[i] = { label: countryLabels[i], code: countryCodes[i] };
  }

  const clickHandler = () => {
    setIsClicked(true);
  };
  const pictureHandler = (code) => {
    setSelectedCountry(code);
    setIsClicked(false);
  };
  return (
    <div>
      <img
        loading="lazy"
        width="20"
        src={`https://flagcdn.com/w20/${selectedCountry.toLowerCase()}.png`}
        alt=""
        onClick={clickHandler}
      />
      {isClicked && (
        <CountrySelector
          options={countries}
          pictureHandler={pictureHandler}
        ></CountrySelector>
      )}
    </div>
  );
};
export default CountryManager;
