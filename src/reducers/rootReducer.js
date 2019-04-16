import { combineReducers } from "redux";
import genres from "./genresReducer";
import movies from "./moviesReducer";
import filters from "./filtersReducer";

const rootReducer = combineReducers({
  genres,
  movies,
  filters
});

export default rootReducer;
