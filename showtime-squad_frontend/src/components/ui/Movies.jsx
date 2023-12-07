// Movies.jsx
import React, { useState, useEffect, useRef } from 'react';
import './Movies.scss';
import { useSearchContext } from '../../context/SearchContext';
import { useFilterMoviesContext } from '../../context/FilterMoviesContext';
import {
  fetchGenreMovies,
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchSearchMovies,
  standardFetchMovies
} from '../../pages/Movies/FetchMovies';


const Movies = () => {
  const { searchQuery } = useSearchContext();
  const { currentMode, currentPayload } = useFilterMoviesContext();
  const [movieData, setMovieData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const region = "FI";
  const loaderRef = useRef(null);
 

  const fetchMovieData = async () => {
    try {

      if (loading) {
        return; // Do nothing if already loading
      }

      let data;
      setLoading(true);
      

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
      const hasMorePages = data.page < data.total_pages;

      if(page === 1) {
        setMovieData(data.results);
      }


        if (hasMorePages && page > 1) {
          // Concatenate new data with existing data
          console.log("fetching more data")
          setMovieData((prevData) => [...prevData, ...data.results]);
        } else {
          console.log('No more pages to fetch.');
        }} catch (error) {
      console.error('Error fetching movie data:', error);
    } finally {
        setLoading(false);
    }
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
      // Trigger fetching more movies when the user is close to the bottom
      if (movieData.length > 10) {
        setPage((prevPage) => prevPage + 1);
        fetchMovieData();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);


  useEffect(() => {

    console.log('Mode changed, resetting page to 1');

    setPage(1);
    console.log(page)
    setMovieData([]);

     fetchMovieData();
    

  }, [searchQuery, currentMode, currentPayload]);

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
      <div ref={loaderRef}></div>
    </div>
  );
};

export default Movies;



