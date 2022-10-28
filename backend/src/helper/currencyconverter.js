const currencyConverter = require("currency-converter-lt");
const countryConverter = require("iso-country-currency");

exports.convertCurrency = async (toCountry) => {
  const countryCode = await this.getCountryCode(toCountry);
  const converter = new currencyConverter({ from: "USD", to: countryCode });
  return converter.rates();
};

exports.getCountryCode = async (country) => {
  try {
    return countryConverter.getParamByISO(country, "currency");
  } catch (err) {
    console.log(err);
  }
};
