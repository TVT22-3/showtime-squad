import React, { useState, useEffect } from 'react';

import "./MovieBlocks.scss"
import MovieBlock from "../atoms/MovieBlock.jsx"

function MovieBlocks({ type }) {
    const [movies, setMovies] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchMoviesBasedOnBlockType(type)
            setMovies(result)
        }

        fetchData()
    }, [type]);

    const BLOCK_COUNT = 5;

    return (
        <section className='movie-blocks'>
            {generateBlocks(BLOCK_COUNT, movies)}
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

async function fetchMoviesBasedOnBlockType(type) {
    let movies = []

    switch (type) {
        case "favorites":
            // fetch favorite movies from db
            console.log("Implement favorites fetch case")

            movies = await fetchFavorites('https://yesno.wtf/api')
            break;

        case "top movies":
            // fetch top movies from api
            console.log("Implement top movies fetch case")

            break;

        default:
            console.log("Implement DEFAULT movie fetch case")
            break;
    }

    return movies
}

async function fetchFavorites(url) {
    let movies = []

    for (let i = 0; i < 5; i++) {
        const movie = await getRequest('https://yesno.wtf/api');
        movies.push({ imgUrl: movie.image, title: movie.answer });
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
        throw error
    }
}

export default MovieBlocks