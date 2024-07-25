import React from 'react';
import './MovieItem.css';

const MovieItem = ({ movie, onClick }) => {
  return (
    <div className="movie-item" onClick={() => onClick(movie)}>
      <img src={movie.poster} alt={movie.title} />
      <h3>{movie.title}</h3>
    </div>
  );
};

export default MovieItem;
