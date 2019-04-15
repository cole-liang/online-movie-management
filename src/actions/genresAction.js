import * as types from './actionTypes';
import { getGenres } from '../services/genreService';

export const loadGenres = async () => {
    return (dispatch) => {
        try {
            const genres = await getGenres();
            return dispatch(loadGenresSuccess(genres));
        } catch (error) {
            throw(error);
        }
    }
}

const loadGenresSuccess = (genres) => ({
    type: types.LOAD_GENRES_SUCCESS,
    genres   
})