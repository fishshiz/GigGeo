import { connect } from "react-redux";
import Selected from "./selected";

const mapStateToProps = (state) => {
    return {
        place: state.highlighted
    };
};

export default connect(mapStateToProps)(Selected);