import React, { Component } from "react";
import GenresList from "./genresList";
import { getMovies } from "../services/moviesService";
import { getGenres } from "../services/genresService";
import { paginate } from "../utils/paginate";
import MovieCard from "./movieCard";
import MoviesPagination from "./moviesPagination";
import Sort from "./moviesSort";
import _ from "lodash";
import SearchBox from "./common/searchBox";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    itemsPerPage: 8,
    currentPage: 1,
    searchQuery: "",
    currentGenre: "All Genres",
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    window.scrollTo(0, 0)
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

  handleSearch = query => {
    this.setState({
      searchQuery: query,
      currentGenre: "All Genres",
      currentPage: 1,
    });
  };

  render() {
    let {
      movies,
      currentGenre,
      itemsPerPage,
      currentPage,
      sortColumn,
      searchQuery,
    } = this.state;

    // this filters the movies if a genre is selected
    if (currentGenre !== "All Genres") {
      movies = movies.filter(movie => movie.genre.name === currentGenre);
    }

    // this filters the movies if a search is made
    if (searchQuery.trim() !== "") {
      movies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // this orders the movies based on A-Z selected
    const sorted = _.orderBy(movies, [sortColumn.path], [sortColumn.order]);

    // this paginates the movies that should be displayed
    const displayedMovies = paginate(sorted, currentPage, itemsPerPage);

    return (
      <div className="row content-container">
        <div className="col-md-12 col-xl-3">
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

        <div className="col-md-12 col-xl-9">
          <h3>Movies</h3>
          {this.state.movies.length === 0 && (
            <div className="d-flex justify-content-center mt-5">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}

          {this.state.movies.length !== 0 && (
            <SearchBox
              value={this.state.searchQuery}
              onChange={this.handleSearch}
            />
          )}
          {this.state.movies.length !== 0 && (
            <p>Currently displaying {movies.length} movie(s)</p>
          )}
          {displayedMovies.length === 0 && this.state.movies.length != "0" && (
            <p>There are no movies that fit these search results.</p>
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
