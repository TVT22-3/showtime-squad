import { useState, useEffect } from 'react';

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Your TMDB API key
    const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

    // TMDB API endpoint for popular movies
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Extract the list of movies from the API response
        const movieList = data.results;
        setMovies(movieList);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Popular Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList