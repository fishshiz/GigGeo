import { combineReducers } from "redux";
import venues from "./venues_reducer";
import results from "./results_reducer";
import date from "./date_reducer";
import search from "./search_reducer";

export default combineReducers({
    venues,
    results,
    date,
    search
});
