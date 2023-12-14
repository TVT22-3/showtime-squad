import "./MovieBlock.scss"
import Stars from "./Stars.jsx"
import { getRequest } from "../../utils/requests.js"
import { useEffect, useState } from "react"
import { setMovieData } from "../../utils/movieData.js"

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL

function MovieBlock({ id, index }) {

    // fetch movie data from api based on id
    const [movieData, setMovieData] = useState(null)
    
    useEffect(() => {
        const fetchMovieData = async () => {
            const data = await getRequest(apiUrl + "/api/movies/3/" + id)
    return (
        <section className='movie-block' data-testid="movie-block">
            <a href={linkUrl} className="image-container" data-title={title}>
                {imgUrl ? <img src={imgUrl} alt={`${title}_poster`} /> : <></>}
            </a>
            <Stars rating={rating} />
        </section>
    )
}

export default MovieBlock