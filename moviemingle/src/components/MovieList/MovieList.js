import React from 'react';
import PropTypes from 'prop-types';

const MovieList = ({ movies, onMovieClick }) => {
  if (!movies || movies.length === 0) {
    return <p>No movies available</p>;
  }

  return (
    <div className="movie-list">
      {movies.map((movie, index) => (
        <div
          className="movie-item"
          key={index}
          onClick={() => onMovieClick(movie)}
        >
          <img src={movie.poster} alt={movie.title} />
          <h3>{movie.title}</h3>
        </div>
      ))}
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieList;
