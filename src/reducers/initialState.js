export default {
  // structure: [{ _id: idStr, title: titleStr, genre: genreObj, numberInStock: (0 - 100), dailyRentalRate: (0 - 5) }]
  movies: [],

  // structure: [{ _id: idStr, name: nameStr }]
  genres: [],

  // structure: { currentGenre: genreObj, currentPage: 1, pageSize: 4, searchInput: inputStr, sortColumn: { path: pathStr, order: ("asc"|"des")} }
  filters: {
    currentGenre: null,
    currentPage: 1,
    pageSize: 4,
    searchInput: "",
    sortColumn: { path: "title", order: "asc" }
  }
};
