import "./MovieBlocks.scss"
import Stars from "./Stars.jsx"

function MovieBlock({ imgUrl = "https://m.media-amazon.com/images/I/71KPOvu-hOL._AC_UF894,1000_QL80_.jpg", linkUrl, title, rating }) {

    return (
        <section className='movie-block'>
            <div className="image-container">
                <img src={imgUrl} alt={`${title}_poster`} />
            </div>
            <h6>{title}</h6>
            <Stars rating={rating} />
        </section>
    )
}

export default MovieBlock