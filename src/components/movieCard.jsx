import React from "react";
import shawshank from "../images/shawshank.jpg";
import { Link } from 'react-router-dom';


const MovieCard = props => {
  const { displayedMovies } = props;
  return (
    <div className="movies-grid">
      {displayedMovies.map(m => (
        <div className="movie-card" style={{ cursor: "pointer" }}>
          <Link className="-link" to={{
            pathname: "/movie/" + m.title,
            state: {
              movie: m
            }
          }}>
          <div className="img-container">
            <img src={m.image} alt="" className="card-img-top" />
          </div>
          <div className="card-body">
            <p className="card-text">{m.title}</p>
          </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MovieCard;
