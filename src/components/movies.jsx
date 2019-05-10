import React, { Component } from "react";
import { getMovies } from "../services/moviesService";
import { getGenres } from "../services/genresService";
import shawshank from "../images/shawshank.jpg";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    itemsPerPage: 10,
    currentGenre: ""
  };

  componentDidMount() {
    const movies = getMovies();
    const genres = getGenres();
    this.setState({ movies, genres });
  }

  selectGenre = (genre) => {
      this.setState({ currentGenre: genre})

  }

  render() {
    const { movies, genres, currentGenre } = this.state;
    console.log(currentGenre);
    return (
      <div className="row">
        <div className="col-md-3">
          <ul class="list-group">
          {genres.map(g => 
              <li className={currentGenre === g.name ? "list-group-item active" : "list-group-item"} onClick={() => this.selectGenre(g.name)}>{g.name}</li>
            )}
          </ul>
        </div>
        <div className="col-md-9">
          <h1>Movies</h1>
          <div className="movies-grid">
            {movies.map(m => (
              <div className="movie-card">
                <div className="img-container">
                  <img src={shawshank} alt="" className="card-img-top" />
                </div>
                <div className="card-body">
                  <p className="card-text">{m.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
