import { RECEIVE_VENUES } from "../actions/venue_actions";

const venueReducer = (state = {}, action) => {
    Object.freeze(state);
    console.log(action);
    let newState;

    switch (action.type) {
        case RECEIVE_VENUES:
            return action.venues._embedded.events;
        default:
        return state;
    }
};

export default venueReducer;