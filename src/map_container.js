import { connect } from "react-redux";
import Map from "./map";

const mapStateToProps = (state) => {
    return {
        venues: state.venues
    };
};

export default connect(mapStateToProps)(Map);