import * as TMUtil from "../util/events_api_util";
export const RECEIVE_VENUES = "RECEIVE_VENUES";
export const CHANGE_DATE = "CHANGE_DATE";
export const SEARCH_TEXT = "SEARCH_TEXT";

export const edSheeranTour = () => dispatch => {
    TMUtil.edSheeranTour().then(res => (
        dispatch(receiveVenues(res))
    ));
};
export const searchArtist = artistName => dispatch => {
    TMUtil.searchArtist(artistName).then(res => (
        dispatch(receiveVenues(res))
    ));
};
export const searchCity = (cityName, date, tomorrow) => dispatch => {
    TMUtil.searchCities(cityName, date, tomorrow).then(res => (
      dispatch(receiveVenues(res))
    ));
};
export const searchCityState = (city, state, date, tomorrow) => dispatch => {
    TMUtil.searchCitieState(city, state, date, tomorrow).then(res => (
      dispatch(receiveVenues(res))
    ));
};

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

