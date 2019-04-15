import { combineReducers } from "redux";
import genresReducer from "./genresReducer";
import moviesReducer from "./moviesReducer";

const rootReducer = combineReducers({
  genresReducer,
  moviesReducer
});

export default rootReducer;
