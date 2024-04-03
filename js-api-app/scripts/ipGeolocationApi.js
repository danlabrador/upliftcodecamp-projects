import { IP_GEOLOCATION_KEY } from './apiKeys.js';

const getLocation = async () => {
  const response = await fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=' + IP_GEOLOCATION_KEY);

  if (!response.ok) throw new Error('Location request failed.');

  const json = await response.json();

  const countryCode = json.country_code;
  const rawCountry = json.country;
  let parsedCountry;

  // Handle countries with 'the' prefix
  const countriesWithPrefixThe = [
    'Bahamas',
    'Cayman Islands',
    'Central African Republic',
    'Comoros',
    'Dominican Republic',
    'Falkland Islands',
    'Gambia',
    'Isle of Man',
    'Leeward Islands',
    'Maldives',
    'Marshall Islands',
    'Netherlands',
    'Philippines',
    'Solomon Islands',
    'Turks and Caicos Islands',
    'United Arab Emirates',
    'United Kingdom',
    'United States',
    'US Virgin Islands',
  ]

  for (let idx = 0; idx < countriesWithPrefixThe.length; ++idx){
    if (countriesWithPrefixThe[idx] === rawCountry)
      parsedCountry = 'the ' + rawCountry;
  }
  if (!parsedCountry) parsedCountry = rawCountry;

  return {
    country: await rawCountry,
    parsedCountry: await parsedCountry,
    countryCode: await countryCode,
  }
}

export default getLocation;