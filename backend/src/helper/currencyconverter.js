const currencyConverter = require("currency-converter-lt");
const countryConverter = require("iso-country-currency");

exports.convertCurrency = async (fromCountry,toCountry) => {
  if (fromCountry === toCountry) 
    return 1;
  const toCountryCode = await this.getCountryCode(toCountry);
  const fromCountryCode = await this.getCountryCode(fromCountry);
  const converter = new currencyConverter({ from: fromCountryCode, to: toCountryCode });
  return converter.rates();
};

exports.getCountryCode = async (country) => {
  try {
    return countryConverter.getParamByISO(country, "currency");
  } catch (err) {
    console.log(err);
  }
};
