import React from "react";
import { Link } from 'react-router-dom';
import slugify from 'slugify';


const MovieCard = props => {
  const { displayedMovies } = props;
  return (
    <div className="movies-grid">
      {displayedMovies.map(m => (
        <div className="movie-card" key={m._id} style={{ cursor: "pointer" }}>
          <Link className="-link" to={{
            pathname: "/movie/" + slugify(m.title, { lower: true }),
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
