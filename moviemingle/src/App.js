import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import MovieList from './components/MovieList/MovieList';
import MovieDetails from './components/MovieDetails/MovieDetails';


const App = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
 
  const [searchTerm, setSearchTerm] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  const fetchTrendingMovies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/trending');
      setTrendingMovies(response.data);
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      
    }
  };


  const fetchRecommendations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/recommend', {
        params: { movie: searchTerm },
      });
      if (response.status === 429) {
        toast.error(response.data.error);
      } else if (response.status !== 200) {
        toast.error(response.data.error || 'An error occurred');
      } else {
        setRecommendations(response.data);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      toast.error('Search limit exceeded. Please wait a few moments and try again.');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecommendations();
  };

  const handleMovieClick = async (movie) => {
    if (!movie.details) {
      try {
        const response = await axios.get('http://localhost:5000/movie_details', {
          params: { movie_title: movie.title },
        });
        if (response.status === 429) {
          toast.error(response.data.error);
        } else if (response.status !== 200) {
          toast.error(response.data.error || 'An error occurred');
        } else {
          setSelectedMovie({ ...movie, ...response.data });
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
        toast.error('Error fetching movie details.');
      }
    } else {
      setSelectedMovie(movie);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>MovieMingle</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter a movie name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Get Recommendations</button>
        </form>
      </header>
      <section className="recommendations">
        <h2>Recommended Movies</h2>
        <MovieList movies={recommendations} onMovieClick={handleMovieClick} />
      </section>
      <section className="trending-movies">
        <h2>Trending Movies</h2>
        <MovieList movies={trendingMovies} onMovieClick={handleMovieClick} />
      </section>
      {selectedMovie && (
        <MovieDetails movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
      <ToastContainer />
    </div>
  );
};

export default App;
