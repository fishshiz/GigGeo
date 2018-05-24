import { CHANGE_DATE } from "../actions/venue_actions";

const dateReducer = (state = [], action) => {
  Object.freeze(state);
  let newState;

  switch (action.type) {
    case CHANGE_DATE:
      return action.date;

    default:
      return state;
  }
};

export default dateReducer;
