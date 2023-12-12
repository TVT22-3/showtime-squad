// TvSeriess.jsx
import React, { useState, useEffect, useRef } from 'react'
import './Movies.scss'
import TvSeriesReview from './TvSeriesReview'
import { useSearchContext } from '../../context/SearchContext'
import { useFilterMoviesContext } from '../../context/FilterMoviesContext'
import {
  fetchTvSeriesGenre,
  fetchTvSeriesOnTheAir,
  fetchPopularTvSeries,
  fetchTopRatedTvSeries,
  fetchTvSeriesAiringToday,
  fetchSearchTvSeries,
  standardFetchTvSeries
} from '../../pages/TvSeries/FetchTvSeries'


const TvSeries = () => {
  const { searchQuery } = useSearchContext()
  const { currentMode, currentPayload } = useFilterMoviesContext()
  const [TvSeriesData, setTvSeriesData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const region = "FI"
  const loaderRef = useRef(null)
  const [pageReset, setPageReset] = useState(false)
  const [hasMorePages, setHasMorePages] = useState(true)
  const [selectedTvSeries, setSelectedTvSeries] = useState(null)

  const fetchTvSeriesData = async () => {
    try {

      if (loading) {
        return // Do nothing if already loading
      }

      let data
      setLoading(true)

      setSelectedTvSeries(null)
      switch (currentMode) {
        case 'popular':
          data = await fetchPopularTvSeries(page)
          break
        case 'ontheair':
          data = await fetchTvSeriesOnTheAir(page, region) // Add the region parameter if needed
          break
        case 'airingtoday':
          data = await fetchTvSeriesAiringToday(page, region) // Add the region parameter if needed
          break
        case 'toprated':
          data = await fetchTopRatedTvSeries(page)
          break
        case 'genre':
          const genreId = currentPayload.id
          data = await fetchTvSeriesGenre(genreId, page)
          break
        case 'tv-series':
          data = await fetchSearchTvSeries(searchQuery, page)
          break
        default:
          data = await standardFetchTvSeries(page)
          break
      }
      const hasMorePages = data.page < data.total_pages
      setHasMorePages(hasMorePages)


      if (page === 1) {
        setTvSeriesData(data.results)
      }


      if (hasMorePages && page > 1) {
        // Concatenate new data with existing data
        console.log("fetching more data")
        setTvSeriesData((prevData) => [...prevData, ...data.results])
      } else {
        console.log('No more pages to fetch.')
      }
    } catch (error) {
      console.error('Error fetching TvSeries data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleObserver = (entries) => {
    const target = entries[0]
    if (target.isIntersecting && !loading) {
      if (TvSeriesData.length > 10) {
        setPage((prevPage) => prevPage + 1)
        fetchTvSeriesData()
      }
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    })

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [loaderRef, handleObserver])

  useEffect(() => {
    setPage(1)
    setTvSeriesData([])
    setPageReset(!pageReset)
    setHasMorePages(true) // Reset the state for more pages
  }, [searchQuery, currentMode, currentPayload])

  useEffect(() => {
    if (pageReset) {
      fetchTvSeriesData()
      setPageReset(!pageReset)
    }
  }, [page, pageReset])

  // Function to handle TvSeries card click
  const handleTvSeriesClick = (tvSeries) => {
    setSelectedTvSeries(tvSeries)
    window.scrollTo({ top: 920, behavior: 'smooth' })
  }

  const handleClearButtonClick = () => {
    setSelectedTvSeries(null)
  }

  return (
    <div className="movie-container">
      {/* Render MovieReview if a movie is selected, otherwise render movie cards */}
      {selectedTvSeries ? (
        <div>
          <button className="clear-button" onClick={handleClearButtonClick}>
            Back to Tv series ←
          </button>
          <TvSeriesReview tvSeries={selectedTvSeries} tvSeriesId={selectedTvSeries ? selectedTvSeries.id : null} />
        </div>
      ) : (
        TvSeriesData.map((tvSeries) => (
          <div
            key={`${tvSeries.id}-${tvSeries.name}`}
            className="movie-card"
            onClick={() => handleTvSeriesClick(tvSeries)}
          >
            <p>{tvSeries.name}</p>
            <p>First air date: {tvSeries.first_air_date || "TBA"}</p>
            <img src={`https://image.tmdb.org/t/p/w500${tvSeries.poster_path}`} alt={tvSeries.name} />
            {/* Add more details as needed */}
          </div>
        ))
      )}

      <div className="text">
        {loading && <p><i className='fa-solid fa-arrows-rotate'></i></p>}
        {!loading && !hasMorePages && <p>End.</p>}
      </div>

      {hasMorePages && !selectedTvSeries && <div ref={loaderRef}></div>}
    </div>
  )
}

export default TvSeries