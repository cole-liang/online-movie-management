import initialState from "./initialState";
import * as types from "../actions/actionTypes";

const genresReducer = (state = initialState.genres, action) => {
  switch (action.type) {
    case types.LOAD_GENRES_SUCCESS:
      return action.genres;

    default:
      return state;
  }
};

export default genresReducer;
