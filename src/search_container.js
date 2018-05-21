import { connect } from "react-redux";
import Search from "./search";
import { edSheeranTour, searchArtist, searchCity} from './actions/venue_actions';

const mapDispatchToProps = dispatch => ({
    edSheeranTour: () => dispatch(edSheeranTour()),
    searchArtist: artistName => dispatch(searchArtist(artistName)),
    searchCities: (cityName, date) => dispatch(searchCity(cityName, date))
});

export default connect(null, mapDispatchToProps)(Search);
