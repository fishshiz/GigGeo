import { CHANGE_DATE } from "../actions/venue_actions";

const dateReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState;

  switch (action.type) {
    case CHANGE_DATE:
    if (Array.isArray(action.date)) {
      return action.date[0];
    } else {
      return action.date;
    }

    default:
      return state;
  }
};

export default dateReducer;
