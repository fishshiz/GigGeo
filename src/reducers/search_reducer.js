import { SEARCH_TEXT } from "../actions/venue_actions";

const searchReducer = (state = "", action) => {
  Object.freeze(state);
  (action);
  let newState;

  switch (action.type) {
    case SEARCH_TEXT:
      return action.text;
    default:
      return state;
  }
};

export default searchReducer;
