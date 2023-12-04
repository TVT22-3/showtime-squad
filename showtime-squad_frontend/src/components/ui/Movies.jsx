import React, { useState, useEffect } from 'react';
import './Movies.scss';
import { useSearchContext } from '../../context/SearchContext';

const Movies = () => {
  const { searchQuery } = useSearchContext();
  const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL;
  const [movieData, setMovieData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchMovieData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/movies?page=${page}&query=${searchQuery}`);
      const data = await response.json();
      const hasMorePages = data.page < data.total_pages;

      if (page === 1) {
        // If it's the first page, set the movieData directly
        setMovieData(data.results);
      } else {
        // If it's not the first page, append the new data to the existing movieData
        setMovieData((prevData) => [...prevData, ...data.results]);
      }

      if (hasMorePages) {
        setPage((prevPage) => prevPage + 1);
      } else {
        console.log('No more pages available.');
      }
    } catch (error) {
      console.error('Error fetching movie data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Clear movieData when searchQuery changes
    setMovieData([]);
    // Reset page to 1 when searchQuery changes
    setPage(1);
  }, [searchQuery]);

  useEffect(() => {
    // Fetch movieData when either searchQuery or page changes
    fetchMovieData();
  }, [searchQuery, page]);

  return (
    <div className="movie-container">
      {movieData.map((movie) => (
        <div key={`${movie.id}-${movie.title}`} className="movie-card">
          <p>{movie.title}</p>
          <p>Release Date: {movie.release_date}</p>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          {/* Add more details as needed */}
        </div>
      ))}

      {loading && <p>Loading more movies...</p>}
    </div>
  );
};

export default Movies;



