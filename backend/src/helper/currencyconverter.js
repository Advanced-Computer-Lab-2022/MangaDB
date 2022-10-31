const currencyConverter = require("currency-converter-lt");
const countryConverter = require("iso-country-currency");

exports.convertCurrency = async (fromCountry, toCountry) => {
  let toCountryCurrency = "USD";
  let fromCountryCurrency = "USD";
  let symbol = "$";
  let rate = 1;
  if (fromCountry === "US") {
    let countryDetails = await this.getCountryCode(toCountry);
    toCountryCurrency = countryDetails.currency;
    symbol = countryDetails.symbol;
  }
  if (toCountry === "US") {
    let countryDetails = await this.getCountryCode(fromCountry);
    fromCountryCurrency = countryDetails.currency;
    symbol = countryDetails.symbol;
  }
  let converter = new currencyConverter({
    from: fromCountryCurrency,
    to: toCountryCurrency,
  });
  rate = await converter.rates();
  return { rate, symbol };
};

exports.getCountryCode = async (country) => {
  try {
    return countryConverter.getAllInfoByISO(country);
  } catch (err) {
    console.log(err);
  }
};
