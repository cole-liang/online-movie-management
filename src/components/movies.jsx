import React, { Component } from "react";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import MoviesTable from "./moviesTable";
import SearchBox from "./common/searchBox";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Spin } from "antd";
import { connect } from "react-redux";
import { genresWithAllGenres } from "../selectors/genresSelector";
import { getPaginatedMoviesAndCount } from "../selectors/moviesSelector";
import * as moviesAction from "../actions/moviesAction";
import * as genresAction from "./../actions/genresAction";

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
    currentGenre: null,
    currentPage: 1,
    pageSize: 4,
    searchInput: "",
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    this.props.loadMovies();
    this.props.loadGenres();
  }

  handleDelete = movie => {
    this.props.deleteMovie(movie._id);
  };

  handleLike = movie => {
    this.props.likeMovie(movie);
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

  render() {
    const {
      currentGenre,
      currentPage,
      pageSize,
      sortColumn,
      searchInput
    } = this.state;

    const { user, movies, genres } = this.props;

    const showingGenres = genresWithAllGenres(genres);

    const { paginatedMovies, count } = getPaginatedMoviesAndCount(
      movies,
      this.state
    );

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

const mapStateToProps = state => {
  return {
    movies: state.movies,
    genres: state.genres
  };
};

const mapDispatchToProps = dispatch => ({
  loadMovies: () => dispatch(moviesAction.loadMovies()),
  addMovie: movie => dispatch(moviesAction.addMovie(movie)),
  likeMovie: movie => dispatch(moviesAction.likeMovie(movie)),
  deleteMovie: movieId => dispatch(moviesAction.deleteMovie(movieId)),
  loadGenres: () => dispatch(genresAction.loadGenres())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movies);
