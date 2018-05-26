import { connect } from "react-redux";
import Search from "./search";
import {
  searchText,
  searchArtist,
  searchCity,
  changeDate
} from "./actions/venue_actions";
import { geocoderQuery, clearResults, toggleArtistSearch } from "./actions/map_actions";

const mapStateToProps = state => {
  return {
    text: state.search,
    artistSearch: state.artist_search
  };
};

const mapDispatchToProps = dispatch => ({
  searchArtist: artistName => dispatch(searchArtist(artistName)),
  searchCities: (cityName, date) => dispatch(searchCity(cityName, date)),
  geocoder: query => dispatch(geocoderQuery(query)),
  changeDate: date => dispatch(changeDate(date)),
  searchText: text => dispatch(searchText(text)),
  clearResults: () => dispatch(clearResults()),
  toggleArtistSearch: bool => dispatch(toggleArtistSearch(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
