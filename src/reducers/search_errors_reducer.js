import {
  RECEIVE_SEARCH_ERRORS,
  RECEIVE_VENUES
} from "../actions/venue_actions";

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_VENUES:
      if (!action.venues._embedded) {
        return true;
      } else {
        return false;
      }
    default:
      return state;
  }
};
