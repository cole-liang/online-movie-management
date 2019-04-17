import { combineReducers } from "redux";
import genres from "./genresReducer";
import movies from "./moviesReducer";
import filters from "./filtersReducer";
import userInfo from "./userReducer";

const rootReducer = combineReducers({
  genres,
  movies,
  filters,
  userInfo
});

export default rootReducer;
