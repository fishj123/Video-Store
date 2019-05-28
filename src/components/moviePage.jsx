import React, { Component } from "react";
import { Link } from "react-router-dom";
import http from "../services/httpService";
import auth, { getUserFromDb } from "../services/authService";
import { toast } from "react-toastify";

class MoviePage extends Component {
  state = {
    user: { name: "", rentals: [] },
    button: "",
    copies: 0,
  };

  async componentDidMount() {
    window.scrollTo(0, 0)
    try {
      
      const { data: user } = await getUserFromDb();
      if (!user) return;
      this.setState({ user: user[0] });
    } catch (ex) {
      return;
    }

    const { movie } = this.props.location.state;
    this.setState({ movie });

    const button = this.checkRentals() ? "stop-rent" : "rent";
    this.setState({ button });
  }


  stopRent = async movie => {
    const originalButton = this.state.button;

    const button = "rent";
    this.setState({ button });

    movie.copies++;
    this.setState({ movie });

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
      toast.success("Movie returned!")
    } catch (ex) {
      this.setState({ button: originalButton });
      toast.error("Oops, something went wrong :(")
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



  handleRent = async movie => {
    const originalButton = this.state.button;
    const button = "stop-rent";
    this.setState({ button });

    movie.copies--;
    this.setState({ movie });

    try {
      console.log(movie);
      let { user } = { ...this.state };
      console.log(user);

      const movieId = movie._id.trim();
      http.put(
        "https://imbd-clone-api.herokuapp.com/api/users/rentals/" + user._id,
        { rentals: movieId }
      );

      const { data: userDB } = await getUserFromDb();
      this.setState({ user: userDB[0] });
      toast.success("Movie rented!");
    } catch (ex) {
      this.setState({ button: originalButton });
      toast.error("Oops, something went wrong :(");
      console.log(ex);
    }
  };

  render() {
    let movie = this.state.movie || this.props.location.state.movie;
    const user = this.state.user || {};
    const button = this.state.button;

    let outOfStock = movie.copies === 0 ? true : false;

    return (
      <React.Fragment>
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
              <p className={outOfStock ? "text-danger" : ""}>Number in stock: {movie.copies}</p>
              {user.name && button === "rent" && (
                <button
                  className={outOfStock ? "btn btn-secondary disabled" : "btn my-btn-primary"}
                  disabled={outOfStock}
                  aria-disabled={outOfStock}
                  onClick={() => this.props.addToBasket(movie)}
                >
                  Add to Basket
                </button>
              )}
              {user.name && button === "stop-rent" && (
                <button
                  className="btn my-btn-primary"
                  id="btn-reverse"
                  onClick={() => this.stopRent(movie)}
                >
                  Stop renting
                </button>
              )}
              {!user.name && (
                <Link to="/login" className="btn my-btn-primary">
                  Login to rent
                </Link>
              )}
            </div>
          </div>
          <div className="row">
            <p className="movie-synopsis">{movie.synopsis}</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MoviePage;
