import React, { Component } from "react";
import GenresList from "./genresList";
import { getMovies } from "../services/moviesService";
import { getGenres } from "../services/genresService";
import { paginate } from "../utils/paginate";
import MovieCard from "./movieCard";
import MoviesPagination from "./moviesPagination";
import Sort from "./moviesSort";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    itemsPerPage: 8,
    currentPage: 1,
    currentGenre: "All Genres",
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data: movies } = await getMovies();
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    this.setState({ movies, genres });
  }

  selectGenre = genre => {
    this.setState({ currentPage: 1 });
    this.setState({ currentGenre: genre });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSort = order => {
    const sortColumn = { ...this.state.sortColumn };
    sortColumn.order = order;
    this.setState({ sortColumn });
  };

  render() {
    let {
      movies,
      currentGenre,
      itemsPerPage,
      currentPage,
      sortColumn,
    } = this.state;

    if (currentGenre !== "All Genres") {
      movies = movies.filter(movie => movie.genre.name === currentGenre);
    }

    const sorted = _.orderBy(movies, [sortColumn.path], [sortColumn.order]);

    const displayedMovies = paginate(sorted, currentPage, itemsPerPage);

    return (
      <div className="row content-container">
        <div className="col-md-3">
          <GenresList
            genres={this.state.genres}
            currentGenre={this.state.currentGenre}
            selectGenre={this.selectGenre}
          />

          <Sort handleSort={this.handleSort} />

          <MoviesPagination
            itemsPerPage={itemsPerPage}
            movies={movies}
            handlePageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>

        <div className="col-md-9">
          <h3>Movies</h3>
          {this.state.movies.length === 0 && <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>}
          {displayedMovies.length === 0 && currentGenre !== "All Genres" && (
            <p>There are no {currentGenre} movies available at this time.</p>
          )}
          <MovieCard displayedMovies={displayedMovies} />
          <MoviesPagination
            itemsPerPage={itemsPerPage}
            movies={movies}
            handlePageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
