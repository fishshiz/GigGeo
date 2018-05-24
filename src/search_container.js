import { connect } from "react-redux";
import Search from "./search";
import {
  searchText,
  searchArtist,
  searchCity,
  changeDate
} from "./actions/venue_actions";
import { geocoderQuery, clearResults } from "./actions/map_actions";

const mapStateToProps = state => {
  return {
    text: state.search
  };
};

const mapDispatchToProps = dispatch => ({
  searchArtist: artistName => dispatch(searchArtist(artistName)),
  searchCities: (cityName, date) => dispatch(searchCity(cityName, date)),
  geocoder: query => dispatch(geocoderQuery(query)),
  changeDate: date => dispatch(changeDate(date)),
  searchText: text => dispatch(searchText(text)),
  clearResults: () => dispatch(clearResults())
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
