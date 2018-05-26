import * as MapUtil from "../util/map_api_util";
export const RECEIVE_GEOCODER = "RECEIEVE_GEOCODER";
export const CLEAR_RESULTS = "CLEAR_RESULTS";
export const TOGGLE_ARTIST_SEARCH = "TOGGLE_ARTIST_SEARCH";
export const HIGHLIGHT_MARKER = "HIGHLIGHT_MARKER";
export const REMOVE_HIGHLIGHT_MARKER = "REMOVE_HIGHLIGHT_MARKER";

export const geocoderQuery = query => dispatch => {
  MapUtil.geocoder(query).then(res => dispatch(receiveGeocoder(res)));
};

export const receiveGeocoder = result => ({
  type: RECEIVE_GEOCODER,
  result
});
export const clearResults = () => ({
  type: CLEAR_RESULTS
});
export const toggleArtistSearch = boolean => ({
  type: TOGGLE_ARTIST_SEARCH,
  boolean
});
export const highlightMarker = (place) => ({
  type: HIGHLIGHT_MARKER,
  place
});
export const removehighlightMarker = () => ({ type: REMOVE_HIGHLIGHT_MARKER });
