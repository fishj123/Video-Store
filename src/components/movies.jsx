import React, { Component } from "react";
import GenresList from "./genresList";
import { getMovies } from "../services/moviesService";
import { getGenres } from "../services/genresService";
import { paginate } from '../utils/paginate';
import shawshank from "../images/shawshank.jpg";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    itemsPerPage: 2,
    currentPage: 1,
    currentGenre: "All Genres",
  };

  componentDidMount() {
    const movies = getMovies();
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies, genres });
  }

  selectGenre = genre => {
    this.setState({ currentGenre: genre });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page});
  }

  getPagesCount() {
      const { movies, itemsPerPage } = this.state;
      const pagesCount = Math.ceil(movies.length / itemsPerPage);
        if (pagesCount === 1) return null;
      const pages = _.range(1, pagesCount + 1);
      return pages;
  }

  render() {
    let { movies, currentGenre, itemsPerPage, currentPage } = this.state;

    if (currentGenre !== "All Genres") {
      movies = movies.filter(movie => movie.genre.name === currentGenre);
    }

    
    const displayedMovies = paginate(movies, currentPage, itemsPerPage)


    return (
      <div className="row movie-container">
        <div className="col-md-3">
          <GenresList
            genres={this.state.genres}
            currentGenre={this.state.currentGenre}
            selectGenre={this.selectGenre}
          />
        </div>
        <div className="col-md-9">
          <h1>Movies</h1>
          <div className="movies-grid">
            {displayedMovies.map(m => (
              <div className="movie-card" style={{ cursor: "pointer" }}>
                <div className="img-container">
                  <img src={shawshank} alt="" className="card-img-top" />
                </div>
                <div className="card-body">
                  <p className="card-text">{m.title}</p>
                </div>
              </div>
            ))}
          </div>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {this.getPagesCount() && this.getPagesCount().map(page => (
                  <li className={page === currentPage ? "page-item active" : "page-item"} onClick={() => this.handlePageChange(page)} >
                  <a className="page-link" href="#">
                    {page}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default Movies;
