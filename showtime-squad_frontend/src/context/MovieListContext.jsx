import React, { createContext, useState, useContext } from 'react';

// Create a context
const MovieListContext = createContext();

// Provider component
const MovieListProvider = ({ children }) => {
  const [movieIds, setMovieIds] = useState([])

  const setMovieIdsFromJson = (json) => {
    if (!json) return; // Guard clause to handle empty json

    try {
      const data = JSON.parse(json);
      if (!data || !data.movieIds) return; // Guard clause to handle missing movieIds property
      setMovieIds(data.movieIds);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  };

  return (
    <MovieListContext.Provider value={{ movieIds, setMovieIds }}>
      {children}
    </MovieListContext.Provider>
  );
};

// Custom hook to easily access the movie IDs from the context
const useMovieList = () => {
  const context = useContext(MovieListContext);
  if (!context) {
    throw new Error('useMovieList must be used within a MovieListProvider'); // Guard clause to ensure useMovieList is used within MovieListProvider
  }
  return context;
};

export { MovieListProvider, useMovieList };
