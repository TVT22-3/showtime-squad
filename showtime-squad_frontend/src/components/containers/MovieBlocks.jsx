import React, { useState, useEffect } from 'react';

import "./MovieBlocks.scss"
import MovieBlock from "../atoms/MovieBlock.jsx"

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL

function MovieBlocks({ ids, maxAmount = 5 }) {
    const [movies, setMovies] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchMoviesBasedIds(ids)
            setMovies(result)
        }

        fetchData()
    }, [ids]);

    return (
        <section className='movie-blocks' data-testid='movie-blocks'>
            {generateBlocks(maxAmount, movies)}
        </section>
    )
}

function generateBlocks(maxMovies, movies) {
    let blocks = []

    // generate as much movies as there are
    let count = 0
    if (movies) {
        movies.map((movie) => {
            blocks.push(<MovieBlock key={count++} imgUrl={movie.imgUrl}/>)
        })
    }

    // generate blank for the rest
    for (let i = count; i < maxMovies; i++) {
        blocks.push(<MovieBlock key={i} />)
    }
    return blocks
}

async function fetchMoviesBasedOnIds(movieIds) {
    let movies = []

    for (let i = 0; i < Min(movieIds.length, maxAmount); i++) {
        const movie = await getRequest(apiUrl + "/api/movies/" + movieIds[i])
        if(movie) {
            movies.push({ 
                imgUrl: movie.poster_path, 
                title: movie.title,
                rating: (movie.vote_average)/2,
                linkUrl: movie.homepage })
        }

    return movies
}

async function fetchFavorites(url) {
    let movies = []

    for (let i = 0; i < 5; i++) {
        const movie = await getRequest('https://yesno.wtf/api')
        if(movie) {
            movies.push({ imgUrl: movie.image, title: movie.answer })
        }
    }

    return movies;
}

async function getRequest(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
        })

        const data = await response.json()

        return data
    } catch (error) {
        console.error('Error fetching data:', error)
        // throw error // TODO: this is annoying with GitHub actions, figure out error throws
    }
}

export default MovieBlocks