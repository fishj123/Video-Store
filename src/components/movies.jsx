import React, { Component } from "react";
import { getMovies } from "../services/moviesService";
import { getGenres } from "../services/genresService";
import shawshank from "../images/shawshank.jpg";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
  };

  componentDidMount() {
    const movies = getMovies();
    const genres = getGenres();
    this.setState({ movies, genres });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-3">
          <ul class="list-group">
            <li class="list-group-item active">Cras justo odio</li>
            <li class="list-group-item">Dapibus ac facilisis in</li>
            <li class="list-group-item">Morbi leo risus</li>
            <li class="list-group-item">Porta ac consectetur ac</li>
            <li class="list-group-item">Vestibulum at eros</li>
          </ul>
        </div>
        <div className="col-md-9">
          <h1>Movies</h1>
          <div className="movies-grid">
            <div className="movie-card" >
              <div className="img-container">
                <img src={shawshank} alt="" className="card-img-top" />
              </div>
              <div className="card-body">
                <p className="card-text">Shawshank Redemption</p>
              </div>
            </div>
            <div className="movie-card" >
              <div className="img-container">
                <img src={shawshank} alt="" className="card-img-top" />
              </div>
              <div className="card-body">
                <p className="card-text">Shawshank Redemption</p>
              </div>
            </div>
            <div className="movie-card" >
              <div className="img-container">
                <img src={shawshank} alt="" className="card-img-top" />
              </div>
              <div className="card-body">
                <p className="card-text">Shawshank Redemption</p>
              </div>
            </div>
            <div className="movie-card" >
              <div className="img-container">
                <img src={shawshank} alt="" className="card-img-top" />
              </div>
              <div className="card-body">
                <p className="card-text">Shawshank Redemption</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
