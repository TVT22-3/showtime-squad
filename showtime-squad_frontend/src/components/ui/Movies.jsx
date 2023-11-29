import React, { useState, useEffect, useRef } from 'react';
import './Movies.scss'; // Import the SCSS file

const Movies = () => {
  const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL
  const [movieData, setMovieData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${apiUrl}/movies?page=${page}`);
        const data = await response.json();
        const hasMorePages = data.page < data.total_pages;

        if (hasMorePages) {
          setMovieData((prevData) => [...prevData, ...data.results]);
          setPage((prevPage) => prevPage + 1);
        } else {
          console.log('No more pages available.');
        }
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    
      setLoading(false);
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchMovieData();
      }
    }, { threshold: 1 });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [page]); // Dependency on page to trigger fetch when page changes

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

      <div ref={loaderRef}></div>
    </div>
  );
};

export default Movies;

