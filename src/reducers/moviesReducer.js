import initialState from "./initialState";
import * as types from "../actions/actionTypes";

const moviesReducer = (state = initialState.movies, action) => {
  switch (action.type) {
    case types.LOAD_MOVIES_SUCCESS:
      return action.movies;

    default:
      return state;
  }
};

export default moviesReducer;
