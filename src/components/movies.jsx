import React, { Component } from "react";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import MoviesTable from "./moviesTable";
import SearchBox from "./common/searchBox";

import { NavLink } from "react-router-dom";
import { Spin } from "antd";
import { connect } from "react-redux";
import { genresWithAllGenres } from "../selectors/genresSelector";
import { getPaginatedMoviesAndCount } from "../selectors/moviesSelector";

import * as moviesAction from "../actions/moviesAction";
import * as genresAction from "../actions/genresAction";
import * as filtersAction from "../actions/filtersAction";

import styled from "styled-components";

const MoviesContent = styled.div`
  width: 100%;

  & .container {
    display: flex;
    align-items: center;
    height: 100%;
  }
`;

class Movies extends Component {
  async componentDidMount() {
    await this.props.loadMovies();
    await this.props.loadGenres();
  }

  handleDelete = async movie => {
    await this.props.deleteMovie(movie._id);
  };

  handleLike = movie => {
    this.props.likeMovie(movie);
  };

  handleGenre = genre => {
    this.props.setCurrentGenre(genre);
    this.props.setCurrentPage(1);
    this.props.setSearchInput("");
  };

  handlePageChange = page => {
    this.props.setCurrentPage(page);
  };

  handleSort = sortColumn => {
    this.props.setSortColumn(sortColumn);
  };

  handleSearchChange = query => {
    this.props.setSearchInput(query);
    this.props.setCurrentGenre(null);
    this.props.setCurrentPage(1);
  };

  render() {
    const { user, movies, genres, filters } = this.props;

    const {
      currentGenre,
      currentPage,
      pageSize,
      sortColumn,
      searchInput
    } = filters;

    const showingGenres = genresWithAllGenres(genres);

    const { paginatedMovies, count } = getPaginatedMoviesAndCount(
      movies,
      filters
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

const mapStateToProps = state => ({
  movies: state.movies,
  genres: state.genres,
  filters: state.filters,
  user: state.userInfo.user
});

const mapDispatchToProps = dispatch => ({
  // movies action
  loadMovies: async () => await dispatch(moviesAction.loadMovies()),
  likeMovie: movie => dispatch(moviesAction.likeMovie(movie)),
  deleteMovie: async movieId =>
    await dispatch(moviesAction.deleteMovie(movieId)),

  // genres action
  loadGenres: async () => await dispatch(genresAction.loadGenres()),

  // filters action
  setCurrentGenre: currentGenre =>
    dispatch(filtersAction.setCurrentGenre(currentGenre)),
  setCurrentPage: currentPage =>
    dispatch(filtersAction.setCurrentPage(currentPage)),
  setPageSize: pageSize => dispatch(filtersAction.setPageSize(pageSize)),
  setSearchInput: searchInput =>
    dispatch(filtersAction.setSearchInput(searchInput)),
  setSortColumn: sortColumn => dispatch(filtersAction.setSortColumn(sortColumn))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movies);
