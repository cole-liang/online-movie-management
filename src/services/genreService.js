import http, { getData } from "./httpService";

const genresUrl = "/genres";

export async function getGenres() {
  return await getData(genresUrl);
}

export function getGenre(genres, name) {
  return genres.find(g => g.name === name);
}
