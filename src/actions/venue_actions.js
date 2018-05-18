import * as TMUtil from "../util/events_api_util";
export const RECEIVE_VENUES = "RECEIVE_VENUES";

export const edSheeranTour = () => dispatch => (
    TMUtil.edSheeranTour().then(res => (
        dispatch(receiveVenues(res))
    ))
);


export const receiveVenues = venues => ({
    type: RECEIVE_VENUES,
    venues
});

