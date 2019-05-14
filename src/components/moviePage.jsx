import React, { Component } from "react";
import { Link } from 'react-router-dom';

class MoviePage extends Component {
  state = {};

navigateToLogin = () => {

}


  render() {
    const { movie } = this.props.location.state;
    const { user} = this.props;
    return (
      <div className="container content-container">
        <h1>{movie.title}</h1>
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
            {user && <button className="btn btn-primary">
              Rent this movie
            </button>}
            {!user && <Link to="/login" className="btn btn-primary">
              Login to rent this movie
            </Link>}
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
