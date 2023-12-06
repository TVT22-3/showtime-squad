import React, { useState, useEffect } from 'react';
import './SearchBar.scss';
import { useSearchContext } from '../../context/SearchContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFilterMoviesContext } from '../../context/FilterMoviesContext';

function SearchBar() {
  const { updateSearchQuery } = useSearchContext();
  const { switchMode } = useFilterMoviesContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 675);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Get the query parameter from the URL
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');

    if (query) {
      // Update the search bar with the query from the URL
      setSearchText(query);
      // Optionally, update the search query in the context
      updateSearchQuery(query);
    }
  }, [location.search, updateSearchQuery]);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchText(query);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Use navigate for client-side navigation
    navigate(`/movies?query=${encodeURIComponent(searchText)}`);

    // Update the search query
    updateSearchQuery(searchText);

    switchMode('searchmovie');
    
  };

  return (
    <search id="search-bar" className={`${isScrolled ? 'scrolled' : ''}`}>
      <form id='search-form' className='search-form' onSubmit={handleSubmit}>
        <input
          id='example-search'
          name='param'
          type='text'
          placeholder='Search...'
          value={searchText}
          onChange={handleInputChange}
        />
        <button id={`${isScrolled ? 'scrolled' : ''}`} type='submit'>
          <i className='fa fa-search'></i>
        </button>
      </form>
    </search>
  );
}

export default SearchBar;



