import React, { Component } from "react";
import { Link } from "react-router-dom";
import http from "../services/httpService";
import auth, { getUserFromDb } from "../services/authService";

class MoviePage extends Component {
  state = {
    user: { name: "", rentals: [] },
    button: "",
  };

  async componentDidMount() {
    try {
      const { data: user } = await getUserFromDb();
      if (!user) return;
      this.setState({ user: user[0] });
    } catch (ex) {
      return;
    }

    const button = this.checkRentals() ? "stop-rent" : "rent";
    this.setState({ button });
  }

  handleRent = async movie => {
    const originalButton = this.state.button;

    const button = "stop-rent";
    this.setState({ button });

    try {
      let { user } = { ...this.props };
      const movieId = movie._id.trim();
      http.put(
        "https://imbd-clone-api.herokuapp.com/api/users/rentals/" + user._id,
        { rentals: movieId }
      );

      const { data: userDB } = await getUserFromDb();
      this.setState({ user: userDB[0] });
    } catch (ex) {
      this.setState({ button: originalButton });
    }
  };

  stopRent = async movie => {
    const originalButton = this.state.button;

    const button = "rent";
    this.setState({ button });

    try {
      const user = this.state.user;
      const movieId = movie._id;
      http.put(
        "https://imbd-clone-api.herokuapp.com/api/users/remove-rental/" +
          user._id,
        {
          rentals: movieId,
        }
      );

      const { data: userDB } = await getUserFromDb();
      this.setState({ user: userDB[0] });
    } catch (ex) {
      this.setState({ button: originalButton });
    }
  };

  checkRentals = () => {
    const user = this.state.user;
    if (!user) return false;
    const { movie } = this.props.location.state;
    let bool = false;

    user.rentals.forEach(rental => {
      if (rental._id === movie._id) {
        bool = true;
      }
    });
    return bool;
  };

  render() {
    const { movie } = this.props.location.state;
    const user = this.state.user || {};
    const button = this.state.button;

    return (
      <div className="container content-container">
        <h3>{movie.title}</h3>
        <div className="row m-5">
          <div className="col-md-6">
            <div className="movie-page-img-container">
              <img src={movie.image} alt={movie.title + " movie poster"} />
            </div>
          </div>
          <div className="col-md-6">
            <p>Title: {movie.title}</p>
            <p>Genre: {movie.genre.name}</p>
            <p>Rental Cost: £{movie.rentalCost} per day</p>
            <p>Number in stock: {movie.copies}</p>
            {user.name && button === "rent" && (
              <button
                className="btn btn-primary"
                onClick={() => this.handleRent(movie)}
              >
                Rent movie
              </button>
            )}
            {user.name && button === "stop-rent" && (
              <button
                className="btn btn-primary" id="btn-reverse"
                onClick={() => this.stopRent(movie)}
              >
                Stop renting
              </button>
            )}
            {!user.name && (
              <Link to="/login" className="btn btn-primary">
                Login to rent
              </Link>
            )}
          </div>
        </div>
        <div className="row">
          <p className="movie-synopsis">{movie.synopsis}</p>
        </div>
      </div>
    );
  }
}

export default MoviePage;
