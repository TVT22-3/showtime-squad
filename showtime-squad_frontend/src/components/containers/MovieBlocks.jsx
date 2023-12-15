import "./MovieBlocks.scss"
import MovieBlock from "../atoms/MovieBlock.jsx"
import { getRequest } from "../../utils/GenericHTTPMethods.jsx"

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL

function MovieBlocks({ ids, maxAmount = 5 }) {
    
    return (
        <section className='movie-blocks' data-testid='movie-blocks'>
            {generateBlocks(maxAmount, ids)}
        </section>
    )
}

function generateBlocks(maxMovies, movieIds) {
    let blocks = []

    // generate as much movies as there are
    let count = 0
    if (movieIds) {
        movieIds.map((movieId) => {
            const movie = getRequest(apiUrl + "/api/movies/" + movieId)
            blocks.push(
                <MovieBlock 
                        key={count++} 
                        imgUrl={movie.poster_path}
                        linkUrl={movie.homepage+"#"}
                        title={movie.title}
                        rating={movie.vote_average/2.0}
                        />)
        })
    }

    // generate blank for the rest
    for (let i = count; i < maxMovies; i++) {
        blocks.push(<MovieBlock key={i} />)
    }
    return blocks
}

export default MovieBlocks