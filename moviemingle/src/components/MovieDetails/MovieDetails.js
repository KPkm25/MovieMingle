import React from "react";
import PropTypes from "prop-types";
import './MovieDetails.css';

const MovieDetails = ({ movie, onClose }) => {
  return (
    <div className="movie-details">
      <div
        className="movie-backdrop"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      ></div>
      <div className="movie-content">
        <div className="movie-poster">
          <img src={movie.poster} alt={movie.title} />
        </div>
        <div className="movie-info">
          <h2>{movie.title}</h2>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p className="tagline"><em>{movie.tagline}</em></p>
          <p><strong>Synopsis:</strong> {movie.synopsis}</p>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Director:</strong> {movie.director}</p>
          <div className="movie-cast">
            <h3>Cast:</h3>
            <div className="cast-list">
              {movie.cast.map((castMember, index) => (
                <div key={index} className="cast-item">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${castMember.profile_path}`}
                    alt={castMember.name}
                  />
                  <p>{castMember.name} as {castMember.character}</p>
                </div>
              ))}
            </div>
          </div>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

MovieDetails.propTypes = {
  movie: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MovieDetails;
