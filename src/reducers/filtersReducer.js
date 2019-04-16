import initialState from "./initialState";
import * as types from "../actions/actionTypes";

const filtersReducer = (state = initialState.filters, action) => {
  switch (action.type) {
    case types.SET_FILTER_CURRENT_GENRE:
      return { ...state, currentGenre: action.currentGenre };

    case types.SET_FILTER_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };

    case types.SET_FILTER_PAGE_SIZE:
      return { ...state, pageSize: action.pageSize };

    case types.SET_FILTER_SEARCH_INPUT:
      return { ...state, searchInput: action.searchInput };

    case types.SET_FILTER_SORT_COLUMN:
      return { ...state, sortColumn: action.sortColumn };

    default:
      return state;
  }
};

export default filtersReducer;
