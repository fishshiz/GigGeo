import { connect } from "react-redux";
import Search from "./search";
import {edSheeranTour} from './actions/venue_actions';

const mapDispatchToProps = dispatch => ({
    edSheeranTour: () => dispatch(edSheeranTour())
});

export default connect(null, mapDispatchToProps)(Search);
