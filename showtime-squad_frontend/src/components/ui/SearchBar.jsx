import React, { useState, useEffect } from 'react'
import './SearchBar.scss'
import { useSearchContext } from '../../context/SearchContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { useFilterMoviesContext } from '../../context/FilterMoviesContext'

function SearchBar() {
  const { updateSearchQuery } = useSearchContext()
  const { switchMode } = useFilterMoviesContext()
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [searchMode, setSearchMode] = useState('movies') // Default to movies
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 675)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const query = queryParams.get('query')
    const mode = queryParams.get('mode')

    if (query) {
      setSearchText(query)
      updateSearchQuery(query)
    }

    // Use the mode from the URL if it exists, otherwise, default to 'movies'
    setSearchMode(mode || 'movies')
  }, [location.search, updateSearchQuery])

  const handleInputChange = (e) => {
    const query = e.target.value
    setSearchText(query)
  }

  const handleModeChange = (e) => {
    const mode = e.target.value
    setSearchMode(mode)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Include searchMode in the query parameters
    navigate(`/${searchMode}?query=${encodeURIComponent(searchText)}&mode=${searchMode}`)
    updateSearchQuery(searchText)
    switchMode(searchMode)
  }

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
        <select id={`${isScrolled ? 'scrolled' : ''}`} value={searchMode} onChange={handleModeChange}>
          <option value="movies">Movies</option>
          <option value="tv-series">TV Series</option>
        </select>
        <button id={`${isScrolled ? 'scrolled' : ''}`} type='submit'>
          <i className='fa fa-search'></i>
        </button>
      </form>
    </search>
  )
}

export default SearchBar





