// Movies.jsx
import React, { useState, useEffect, useRef } from 'react';
import './Movies.scss';
import MovieReview from './MovieReview';
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
  const [pageReset, setPageReset] = useState(false);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);

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
      setHasMorePages(hasMorePages);


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

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && !loading) {
      if (movieData.length > 10) {
        setPage((prevPage) => prevPage + 1);
        fetchMovieData();
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [loaderRef, handleObserver]);

  useEffect(() => {
    setPage(1);
    setMovieData([]);
    setPageReset(!pageReset);
    setHasMorePages(true); // Reset the state for more pages
  }, [searchQuery, currentMode, currentPayload]);

  useEffect(() => {
    if (pageReset) {
      fetchMovieData();
      setPageReset(!pageReset);
    }
  }, [page, pageReset]);

  // Function to handle movie card click
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="movie-container">
      {/* Render MovieReview if a movie is selected, otherwise render movie cards */}
      {selectedMovie ? (
       <MovieReview movie={selectedMovie} movieId={selectedMovie ? selectedMovie.id : null} />
      ) : (
        movieData.map((movie) => (
          <div
            key={`${movie.id}-${movie.title}`}
            className="movie-card"
            onClick={() => handleMovieClick(movie)}
          >
            <p>{movie.title}</p>
            <p>Release Date: {movie.release_date}</p>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            {/* Add more details as needed */}
          </div>
        ))
      )}

      <div className="text">
        {loading && <p><i className='fa-solid fa-arrows-rotate'></i></p>}
        {!loading && !hasMorePages && <p>End.</p>}
      </div>

      {hasMorePages && !selectedMovie && <div ref={loaderRef}></div>}
    </div>
  );
};

export default Movies;