export const REQUEST_COUNTRIES = "REQUEST_COUNTRIES";
export const RECEIVE_COUNTRIES = "RECEIVE_COUNTRIES";

export function requestCountries(countries) {
  return {
    type: REQUEST_COUNTRIES,
    countries
  };
}

export function receiveCountries(countries, json) {
  return {
    type: RECEIVE_COUNTRIES,
    countries,
    receivedAt: Date.now()
  };
}

export function fetchCountries(countries) {
  return dispatch => {
    dispatch(requestCountries(countries));
    return fetch(
      "https://restcountries.eu/rest/v2/all?fields=alpha2Code;capital;name;region;callingCodes"
    )
      .then(res => res.json())
      .then(json => dispatch(receiveCountries(countries, json)))
      .catch(err => console.log(err));
  };
}

function shouldFetchCountries(state, countries) {
  const data = state.countries;
  if (!data) {
    return true;
  } else {
    return false;
  }
}

export function fetchCountriesIfNeeded(countries) {
  return (dispatch, getState) => {
    if (shouldFetchCountries(getState(), countries)) {
      return dispatch(fetchCountries(countries));
    }
  };
}
