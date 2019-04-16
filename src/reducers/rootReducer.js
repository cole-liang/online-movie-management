import { combineReducers } from "redux";
import genres from "./genresReducer";
import movies from "./moviesReducer";

const rootReducer = combineReducers({
  genres,
  movies
});

export default rootReducer;
