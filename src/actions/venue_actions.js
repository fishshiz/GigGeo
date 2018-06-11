import * as TMUtil from "../util/events_api_util";
export const RECEIVE_VENUES = "RECEIVE_VENUES";
export const CHANGE_DATE = "CHANGE_DATE";
export const SEARCH_TEXT = "SEARCH_TEXT";
export const RECEIVE_SEARCH_ERRORS = "RECEIVE_SEARCH_ERRORS";

export const edSheeranTour = () => dispatch => {
  TMUtil.edSheeranTour().then(res => dispatch(receiveVenues(res)));
};
export const searchArtist = artistName => dispatch => {
  TMUtil.searchArtist(artistName).then(
    res => dispatch(receiveVenues(res)),
    err => dispatch(receiveErrors(err.responseJSON))
  );
};
export const searchCity = (cityName, date, tomorrow) => dispatch => {
  TMUtil.searchCities(cityName, date, tomorrow).then(
    res => dispatch(receiveVenues(res)),
    err => dispatch(receiveErrors(err.responseJSON))
  );
};
export const searchCityState = (city, state, date, tomorrow) => dispatch => {
  TMUtil.searchCitieState(city, state, date, tomorrow).then(
    res => dispatch(receiveVenues(res)),
    err => dispatch(receiveErrors(err.responseJSON))
  );
};

export const receiveErrors = errors => ({
  type: RECEIVE_SEARCH_ERRORS,
  errors
});

export const changeDate = date => ({
  type: CHANGE_DATE,
  date
});

export const receiveVenues = venues => ({
  type: RECEIVE_VENUES,
  venues
});

export const searchText = text => ({
  type: SEARCH_TEXT,
  text
});
