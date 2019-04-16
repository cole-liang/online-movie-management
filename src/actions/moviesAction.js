import * as types from "./actionTypes";
import * as moviesAPI from "../services/movieService";
import { toast } from "react-toastify";

export const loadMovies = () => {
  return async dispatch => {
    try {
      const movies = await moviesAPI.getMovies();
      return dispatch(loadMoviesSuccess(movies));
    } catch (error) {
      throw error;
    }
  };
};

export const addMovie = movie => {
  return async dispatch => {
    try {
      await moviesAPI.saveMovie(movie);
      return dispatch(addMovieSuccess(movie));
    } catch (error) {
      throw error;
    }
  };
};

export const updateMovie = movie => {
  return async dispatch => {
    try {
      await moviesAPI.saveMovie(movie);
      return dispatch(updateMovieSuccess(movie));
    } catch (error) {
      throw error;
    }
  };
};

export const deleteMovie = movieId => {
  return async dispatch => {
    try {
      await moviesAPI.deleteMovie(movieId);
      return dispatch(deleteMovieSuccess(movieId));
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error("This movie has already been deleted.");
      if (error.response && error.response.status === 403)
        toast.error("Unauthorized user cannot delete item");
      if (error.response && error.response.status === 400)
        toast.error("Please login");
      return dispatch(movieActionFail());
    }
  };
};

export const likeMovie = movie => {
  return dispatch => {
    return dispatch(likeMovieSuccess(movie));
  };
};

const addMovieSuccess = movie => ({
  type: types.ADD_MOVIE_SUCCESS,
  movie
});

const updateMovieSuccess = movie => ({
  type: types.UPDATE_MOVIE_SUCCESS,
  movie
});

const deleteMovieSuccess = movieId => ({
  type: types.DELETE_MOVIE_SUCCESS,
  movieId
});

const likeMovieSuccess = movie => ({
  type: types.LIKE_MOVIE_SUCCESS,
  movie
});

const loadMoviesSuccess = movies => ({
  type: types.LOAD_MOVIES_SUCCESS,
  movies
});

const movieActionFail = () => ({
  type: types.MOVIE_ACTION_FAIL
});
