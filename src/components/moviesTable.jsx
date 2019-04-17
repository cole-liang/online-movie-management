import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
  state = {
    columns: [
      {
        path: "title",
        label: "Title",
        content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      },
      { path: "genre.name", label: "Genre" },
      { path: "numberInStock", label: "Stock" },
      { path: "dailyRentalRate", label: "Rate" },
      {
        key: "like",
        content: movie => (
          <Like isLike={movie.isLike} onLike={() => this.props.onLike(movie)} />
        )
      }
    ]
  };

  deleteColumn = {
    key: "delete",
    content: movie => (
      <button
        className="btn btn-danger"
        onClick={() => this.props.onDelete(movie)}
      >
        Delete
      </button>
    )
  };

  componentDidMount() {
    const user = this.props.user;
    if (user && user.isAdmin) this.state.columns.push(this.deleteColumn);
  }

  render() {
    const { movies, sortColumn, onSort } = this.props;
    const { columns } = this.state;
    return (
      <Table
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
        columns={columns}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.userInfo.user,
  filters: state.filters
});

export default connect(
  mapStateToProps,
  null
)(MoviesTable);
