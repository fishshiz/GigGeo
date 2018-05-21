import { connect } from "react-redux";
import Search from "./search";
import {edSheeranTour, searchArtist} from './actions/venue_actions';

const mapDispatchToProps = dispatch => ({
    edSheeranTour: () => dispatch(edSheeranTour()),
    searchArtist: artistName => dispatch(searchArtist(artistName))
});

export default connect(null, mapDispatchToProps)(Search);
