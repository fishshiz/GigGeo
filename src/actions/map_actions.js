import * as MapUtil from "../util/map_api_util";
export const RECEIVE_GEOCODER = "RECEIEVE_GEOCODER";
export const CLEAR_RESULTS = "CLEAR_RESULTS";

export const geocoderQuery = query => dispatch => {
  MapUtil.geocoder(query).then(res => dispatch(receiveGeocoder(res)));
};

export const receiveGeocoder = result => ({
  type: RECEIVE_GEOCODER,
  result
});
export const clearResults = result => ({
  type: CLEAR_RESULTS
});
