import _ from "lodash";
import { paginate } from "../utils/paginate";

export const getPaginatedMoviesAndCount = (
  allMovies,
  { currentGenre, currentPage, pageSize, sortColumn, searchInput }
) => {
  let selectedMovies =
    currentGenre && currentGenre._id
      ? allMovies.filter(movie => movie.genre.name === currentGenre.name)
      : allMovies;

  selectedMovies = selectedMovies.filter(m =>
    m.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  const sortMovies = _.orderBy(
    selectedMovies,
    sortColumn.path,
    sortColumn.order
  );

  const paginatedMovies = paginate(sortMovies, pageSize, currentPage);

  const count = selectedMovies.length;

  return { paginatedMovies, count };
};
