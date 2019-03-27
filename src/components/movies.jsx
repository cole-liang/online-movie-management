import React, { Component } from "react";
import { getGenres } from "../services/genreService";
import { getMovies, deleteMovie } from "../services/movieService";
import { paginate } from "../utils/paginate";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Spin } from "antd";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import MoviesTable from "./moviesTable";
import SearchBox from "./common/searchBox";
import styled from "styled-components";
import _ from "lodash";

const MoviesContent = styled.div`
  width: 100%;

  & .container {
    display: flex;
    align-items: center;
    height: 100%;
  }
`;

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentGenre: null,
    currentPage: 1,
    pageSize: 4,
    searchInput: "",
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    const movies = await getMovies();
    const genres = await getGenres();
    this.setState({ movies, genres });
  }

  handleDelete = async movie => {
    const originalMovies = [...this.state.movies];

    const movies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error("This movie has already been deleted.");
      if (error.response && error.response.status === 403)
        toast.error("Unauthorized user cannot delete item");
      if (error.response && error.response.status === 400)
        toast.error("Please login");
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].isLike = !movie.isLike;
    this.setState({ movies });
  };

  handleGenre = genre => {
    this.setState({
      currentGenre: genre,
      currentPage: 1,
      searchInput: ""
    });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn: sortColumn });
  };

  handleSearchChange = query => {
    this.setState({ searchInput: query, currentGenre: null, currentPage: 1 });
  };

  getPageData = () => {
    const {
      movies: allMovies,
      genres,
      currentGenre,
      currentPage,
      pageSize,
      sortColumn,
      searchInput
    } = this.state;

    const showingGenres = [{ _id: "", name: "All Genres" }, ...genres];

    let selectedMovies =
      currentGenre && currentGenre._id
        ? allMovies.filter(movie => movie.genre.name === currentGenre.name)
        : allMovies;

    selectedMovies = selectedMovies.filter(m =>
      m.title.toLowerCase().startsWith(searchInput.toLowerCase())
    );

    const sortMovies = _.orderBy(
      selectedMovies,
      sortColumn.path,
      sortColumn.order
    );

    const paginatedMovies = paginate(sortMovies, pageSize, currentPage);

    const count = selectedMovies.length;

    return { showingGenres, paginatedMovies, count };
  };

  render() {
    const {
      currentGenre,
      currentPage,
      pageSize,
      sortColumn,
      searchInput
    } = this.state;

    const { user } = this.props;

    const { showingGenres, paginatedMovies, count } = this.getPageData();

    if (count === 0)
      return <Spin style={{ margin: "auto" }} tip="Loading..." />;
    return (
      <MoviesContent>
        <div className="container">
          <div className="row w-100">
            <div className="col-3">
              <ListGroup
                selectedItem={currentGenre ? currentGenre.name : ""}
                items={showingGenres}
                onItemSelect={this.handleGenre}
              />
            </div>
            <div className="col">
              {user && (
                <NavLink to="/movies/new" className="btn btn-primary">
                  New Movie
                </NavLink>
              )}
              <div>There are {count} movies in the list.</div>
              <SearchBox
                value={searchInput}
                onChange={this.handleSearchChange}
              />
              <MoviesTable
                movies={paginatedMovies}
                sortColumn={sortColumn}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
                user={user}
              />
              <Pagination
                pageSize={pageSize}
                totalItemNum={count}
                onPageChange={this.handlePageChange}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </MoviesContent>
    );
  }
}

export default Movies;
