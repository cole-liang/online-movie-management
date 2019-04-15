export default {
  movies: [], // structure: [{ _id: idStr, title: titleStr, genre: genreObj,
  //                          numberInStock: (0 - 100), dailyRentalRate: (0 - 5) }]
  genres: [], // structure: [{ _id: idStr, name: nameStr }]
  filters: {} // structure: { currentGenre: genreObj, currentPage: 1, pageSize: 4,
  //                          searchInput: inputStr, sortColumn: { path: pathStr, order: ("asc"|"des")} }
};
