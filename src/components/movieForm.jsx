import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import * as moviesAction from "../actions/moviesAction";
import { connect } from "react-redux";

class MovieForm extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    errors: {}
  };

  /* Data will lose after refreshing. If loadMovie is implemented in Action, it */
  /* will be hard to redirect to not-found page. Looking for a better solution. */
  populateMovies() {
    if (this.props.isAddMovie) return;

    // try {
    const movie = this.props.movie;

    if (movie) {
      this.setState({ data: this.mapToViewModel(movie) });
    } else {
      this.props.history.replace("/not-found");
    }
    // } catch (error) {
    // if (error.response && error.response.status === 404)
    // this.props.history.replace("/not-found");
    // }
  }

  componentDidMount() {
    this.populateMovies();
    console.log("Form");
  }

  mapToViewModel = movie => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  };

  schema = {
    _id: Joi.optional(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .integer()
      .min(0)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Rate")
  };

  doSubmit = () => {
    this.props.isAddMovie
      ? this.props.addMovie(this.state.data)
      : this.props.updateMovie(this.state.data);

    this.props.history.push("/movies");
  };

  render() {
    const { genres } = this.props;

    return (
      <React.Fragment>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", genres)}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  genres: state.genres,
  movie: state.movies.find(movie => movie._id === ownProps.match.params.id),
  isAddMovie: ownProps.match.params.id === "new"
});

const mapDispatchToProps = dispatch => ({
  addMovie: movie => dispatch(moviesAction.addMovie(movie)),
  updateMovie: movie => dispatch(moviesAction.updateMovie(movie))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieForm);
