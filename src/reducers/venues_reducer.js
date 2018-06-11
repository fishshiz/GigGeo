import { RECEIVE_VENUES } from "../actions/venue_actions";

const venueReducer = (state = [], action) => {
    Object.freeze(state);
    let newState;

    switch (action.type) {
        case RECEIVE_VENUES:
            if (action.venues._embedded) {
                return action.venues._embedded.events;
            } else {
                console.log(action);
                return state;
            }
        default:
        return state;
    }
};

export default venueReducer;