import * as types from './actionTypes';
import { getMovies } from '../services/movieService';

export const loadMovies = async () => {
    return (dispatch) => {
        try {
            const movies = await getMovies();
            return dispatch(loadMoviesSuccess(movies));
        } catch (error) {
            throw(error);
        }
    }
}

const addMovieSuccess = (movie) => ({
    type: types.ADD_MOVIES_SUCCESS,
    movie
})

const loadMoviesSuccess = (movies) => ({
    type: types.LOAD_MOVIES_SUCCESS,
    movies
})