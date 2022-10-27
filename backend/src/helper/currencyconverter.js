const currencyConverter = require('currency-converter-lt')
const countryConverter=require('iso-country-currency')

exports.convertCurrency= async (toCountry) => {
    const countryCode = await this.getCountryCode(toCountry);
    const converter = new currencyConverter({from:"USD", to:countryCode});
    converter.rates().then((result) => {
        console.log(result);
        return result;
    }).catch((err) => {
        console.log(err);
    });
}

exports.getCountryCode= async (country) => {
    try
    {    return countryConverter.getParamByISO(country,  'currency');
}catch(err){
        console.log(err);
    }
}

