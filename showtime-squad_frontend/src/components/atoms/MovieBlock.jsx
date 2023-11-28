import "./MovieBlock.scss"
import Stars from "./Stars.jsx"

function MovieBlock({
    imgUrl = "",
    linkUrl = "#",
    title = "",
    rating = 2.5
}) {

    return (
        <section className='movie-block'>
            <a href={linkUrl} className="image-container" data-title={title}>
                {imgUrl ? <img src={imgUrl} alt={`${title}_poster`} /> : <></>}
            </a>
            <Stars rating={rating} />
        </section>
    )
}

export default MovieBlock