import { combineReducers } from "redux";
import genres from "./genresReducer";
import movies from "./moviesReducer";
import filters from "./filtersReducer";
import user from "./userReducer";

const rootReducer = combineReducers({
  genres,
  movies,
  filters,
  user
});

export default rootReducer;
