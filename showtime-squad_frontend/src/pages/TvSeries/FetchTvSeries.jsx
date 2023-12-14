// api/searchApi.js
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL;

export const fetchPopularTvSeries = async (page) => {
    const response = await fetch(`${apiUrl}/tv/series/popular?page=${page}`);
    const data = await response.json();
    return data;
  };
  
  export const fetchTvSeriesOnTheAir = async (page) => {
    const response = await fetch(`${apiUrl}/tv/series/ontheair?page=${page}`);
    const data = await response.json();
    return data;
  };
  
  export const fetchTvSeriesAiringToday = async (page) => {
    const response = await fetch(`${apiUrl}/tv/series/airingtoday?page=${page}`);
    const data = await response.json();
    return data;
  };
  
  export const fetchTvSeriesGenre = async (genreId, page) => {
    const response = await fetch(`${apiUrl}/tv/series/genre?genreId=${genreId}&page=${page}`);
    const data = await response.json();
    return data;
  };
  
  export const fetchSearchTvSeries = async (searchQuery, page) => {
    const response = await fetch(`${apiUrl}/tv/series/search?searchQuery=${searchQuery}&page=${page}`);
    const data = await response.json();
    return data;
  };
  
  export const fetchTopRatedTvSeries = async (page) => {
    const response = await fetch(`${apiUrl}/tv/series/toprated?page=${page} 
    `);
    const data = await response.json();
    return data;
  };

  export const standardFetchTvSeries = async (page) => {
    const response = await fetch(`${apiUrl}/tv/series/?page=${page}`);
    const data = await response.json();
    return data;
  };