import { HIGHLIGHT_MARKER, REMOVE_HIGHLIGHT_MARKER } from "../actions/map_actions";

const highlightedReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState;

    switch (action.type) {
      case HIGHLIGHT_MARKER:
        return action.place;
    case REMOVE_HIGHLIGHT_MARKER:
    return {};
      default:
        return state;
    }
};

export default highlightedReducer;
