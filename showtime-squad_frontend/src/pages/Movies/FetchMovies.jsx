// api/searchApi.js
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL;

export const fetchPopularMovies = async (page) => {
    const response = await fetch(`${apiUrl}/movies/popular?page=${page}`);
    const data = await response.json();
    return data;
  };
  
  export const fetchNowPlayingMovies = async (page, region) => {
    const response = await fetch(`${apiUrl}/movies/nowplaying?page=${page}&region=${region}`);
    const data = await response.json();
    return data;
  };
  
  export const fetchUpcomingMovies = async (page, region) => {
    const response = await fetch(`${apiUrl}/movies/upcoming?page=${page}&region=${region}`);
    const data = await response.json();
    return data;
  };
  
  export const fetchGenreMovies = async (genreId, page) => {
    const response = await fetch(`${apiUrl}/movies/genre?genreId=${genreId}&page=${page}`);
    const data = await response.json();
    return data;
  };
  
  export const fetchSearchMovies = async (searchQuery, page) => {
    const response = await fetch(`${apiUrl}/movies/search?searchQuery=${searchQuery}&page=${page}`);
    const data = await response.json();
    return data;
  };
  
  export const fetchTopRatedMovies = async (page) => {
    const response = await fetch(`${apiUrl}/movies/toprated?page=${page} 
    `);
    const data = await response.json();
    return data;
  };

  export const standardFetchMovies = async (page) => {
    const response = await fetch(`${apiUrl}/movies/?page=${page}`);
    const data = await response.json();
    return data;
  };