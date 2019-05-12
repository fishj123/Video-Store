import React, { Component } from "react";

class MoviePage extends Component {
  state = {};
  render() {
    const { movie } = this.props.location.state;
    console.log(movie);
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
          </div>
        </div>
        <div className="row">
          <p>Some text about the movie here... Some text about the movie here... Some text about the movie here... Some text about the movie here... Some text about the movie here... Some text about the movie here... Some text about the movie here... Some text about the movie here... Some text about the movie here... Some text about the movie here... Some text about the movie here... Some text about the movie here... Some text about the movie here... Some text about the movie here... Some text about the movie here...</p>
        </div>
      </div>
    );
  }
}

export default MoviePage;
