import {
  RECEIVE_SEARCH_ERRORS,
  RECEIVE_VENUES,
  SEARCH_TEXT
} from "../actions/venue_actions";

export default (state = false, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_VENUES:
      if (action.venues._embedded) {
        return false;
      } else {
        return true;
      }
    case SEARCH_TEXT:
      return false;
    default:
      return state;
  }
};
