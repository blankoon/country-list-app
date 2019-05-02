import { combineReducers } from "redux";
import { REQUEST_COUNTRIES, RECEIVE_COUNTRIES } from "../actions";

function countries(
  state = {
    isFetching: false,
    countries: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_COUNTRIES:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_COUNTRIES:
      return Object.assign({}, state, {
        isFetching: false,
        countries: action.countries,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

function countriesBySubreddit(state = {}, action) {
  switch (action.type) {
    case RECEIVE_COUNTRIES:
    case REQUEST_COUNTRIES:
      return Object.assign({}, state, {
        [action.countries]: countries(state[action.countries], action)
      });
    default:
      return state;
  }
}

const countryListApp = combineReducers({
  countriesBySubreddit,
  selectedSubreddit
});

export default countryListApp;
