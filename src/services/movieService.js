import http, { getData } from "./httpService";

const moviesUrl = "/movies";

export async function getMovies() {
  return await getData(moviesUrl);
}

export async function getMovie(id) {
  const { data: movie } = await http.get(moviesUrl + "/" + id);
  return movie;
}

export async function deleteMovie(id) {
  const deletedMovie = await http.delete(moviesUrl + "/" + id);
  return deletedMovie;
}

export async function saveMovie(movie) {
  const body = { ...movie };
  delete body._id;

  if (movie._id) {
    return await http.put(`${moviesUrl}/${movie._id}`, body);
  }
  return await http.post(moviesUrl, body);
}
