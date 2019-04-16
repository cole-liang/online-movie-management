import initialState from "./initialState";
import * as types from "../actions/actionTypes";

const moviesReducer = (state = initialState.movies, action) => {
  switch (action.type) {
    case types.LOAD_MOVIES_SUCCESS:
      return action.movies;

    case types.ADD_MOVIE_SUCCESS:
      return [...state, action.movie];

    case types.UPDATE_MOVIE_SUCCESS:
      return state.map(movie => {
        if (movie._id === action.movie._id) {
          return action.movie;
        } else {
          return movie;
        }
      });

    case types.DELETE_MOVIE_SUCCESS:
      return state.filter(movie => movie._id !== action.movieId);

    case types.LIKE_MOVIE_SUCCESS:
      let movies = [...state];
      const index = movies.indexOf(action.movie);
      movies[index].isLike = !action.movie.isLike;
      return movies;

    default:
      return state;
  }
};

export default moviesReducer;
