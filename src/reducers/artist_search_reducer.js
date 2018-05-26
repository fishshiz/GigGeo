import { TOGGLE_ARTIST_SEARCH } from "../actions/map_actions";

const artistSearchReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState;

    switch (action.type) {
      case TOGGLE_ARTIST_SEARCH:
        return action.boolean;

      default:
        return state;
    }
};

export default artistSearchReducer;
