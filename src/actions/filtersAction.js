import * as types from "./actionTypes";

export const setCurrentGenre = currentGenre => ({
  type: types.SET_FILTER_CURRENT_GENRE,
  currentGenre
});

export const setCurrentPage = currentPage => ({
  type: types.SET_FILTER_CURRENT_PAGE,
  currentPage
});

export const setPageSize = pageSize => ({
  type: types.SET_FILTER_PAGE_SIZE,
  pageSize
});

export const setSearchInput = searchInput => ({
  type: types.SET_FILTER_SEARCH_INPUT,
  searchInput
});

export const setSortColumn = sortColumn => ({
  type: types.SET_FILTER_SORT_COLUMN,
  sortColumn
});
