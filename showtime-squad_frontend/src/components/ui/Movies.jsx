// Movies.jsx
import React, { useState, useEffect } from 'react';
import './Movies.scss';
import { useSearchContext } from '../../context/SearchContext';
import { useFilterMoviesContext } from '../../context/FilterMoviesContext';
import { fetchGenreMovies,
         fetchNowPlayingMovies, 
         fetchPopularMovies, 
         fetchTopRatedMovies, 
         fetchUpcomingMovies, 
         fetchSearchMovies, 
         standardFetchMovies } from '../../pages/Movies/FetchMovies';

const Movies = () => {
  const { searchQuery } = useSearchContext();
  const { currentMode, currentPayload } = useFilterMoviesContext();
  const [movieData, setMovieData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const region = "FI";

  const fetchMovieData = async () => {
    try {
      setLoading(true);
      let data;

      switch (currentMode) {
        case 'popular':
          data = await fetchPopularMovies(page);
          break;
        case 'nowplaying':
          data = await fetchNowPlayingMovies(page, region); // Add the region parameter if needed
          break;
        case 'upcoming':
          data = await fetchUpcomingMovies(page, region); // Add the region parameter if needed
          break;
        case 'toprated':
          data = await fetchTopRatedMovies(page);
          break;
        case 'genre':
          const genreId = currentPayload.id;
          data = await fetchGenreMovies(genreId, page);
          break;
        case 'searchmovie':
          data = await fetchSearchMovies(searchQuery, page);
          break;
        default:
          data = await standardFetchMovies(page);
          break;
      }
      const hasMorePages = data.page < Math.min(data.total_pages, 10);


      if (page === 1) {
        setMovieData(data.results);
      } else {
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

  const handleUserRating = async (movieId, rating) => {
    try {
      await postUserRating(movieId, rating);
      // You can update state or perform other actions after successful rating submission
    } catch (error) {
      console.error('Error submitting user rating:', error);
    }
  };

  const handleMarkAsFavorite = async (movieId) => {
    try {
      await markAsFavorite(movieId);
      // You can update state or perform other actions after successful favorite marking
    } catch (error) {
      console.error('Error marking movie as favorite:', error);
    }
  };

  useEffect(() => {
    setMovieData([]);
    setPage(1);
  }, [searchQuery, currentMode, currentPayload]);

  useEffect(() => {
    fetchMovieData();
  }, [searchQuery, page, currentMode, currentPayload]);

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

      {loading && <p>Loading movies...</p>}
    </div>
  );
};

export default Movies;



