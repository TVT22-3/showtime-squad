// MovieComponent.jsx

import React, { useState, useEffect } from 'react';
import './Movies.scss'; // Import the SCSS file

const Movies = () => {
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch('http://localhost:8080/movies');
        const data = await response.json();
        setMovieData(data.results); // Assuming the movies are in a 'results' array
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchMovieData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div className="movie-container">
      {movieData ? (
        movieData.map((movie) => (
          <div key={movie.id} className="movie-card">
            <p>{movie.title}</p>
            {/*<p>Overview: {movie.overview}</p>*/}
            <p>Release Date: {movie.release_date}</p>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            {/* Add more details as needed */}
          </div>
        ))
      ) : (
        <p>Loading movie data...</p>
      )}
    </div>
  );
};

export default Movies;

