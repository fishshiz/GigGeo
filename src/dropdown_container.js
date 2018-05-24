import { connect } from "react-redux";
import { searchCityState, searchText } from "./actions/venue_actions";
import { clearResults } from "./actions/map_actions";

import Dropdown from "./dropdown";
const mapStateToProps = state => {
  return {
    geocode: state.results,
    date: state.date
  };
};

const mapDispatchToProps = dispatch => ({
  searchCities: (city, state, date) =>
    dispatch(searchCityState(city, state, date)),
    clearResults: () => dispatch(clearResults()),
    searchResults: text => dispatch(searchText(text))
});
export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);
