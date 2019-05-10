import React from "react";
import shawshank from "../images/shawshank.jpg";


const MovieCard = props => {
  const { displayedMovies } = props;
  return (
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
  );
};

export default MovieCard;
