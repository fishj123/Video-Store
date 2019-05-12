import React, { Component } from "react";

class MoviePage extends Component {
  state = {};
  render() {
    const { movie } = this.props.location.state;
    console.log(movie);
    return <h1>Movie Page -  {movie.title}</h1>;
  }
}

export default MoviePage;
