import "./MovieBlock.scss"
import Stars from "./Stars.jsx"

function MovieBlock({ movie = {
    imgUrl: "https://m.media-amazon.com/images/I/71KPOvu-hOL._AC_UF894,1000_QL80_.jpg",
    linkUrl: "#",
    title: "",
    rating: 2.5
} }) {
    const { imgUrl, linkUrl, title, rating } = movie;

    return (
        <section className='movie-block'>
            <a href={linkUrl} className="image-container" data-title={title}>
                <img src={imgUrl} alt={`${title}_poster`} />
            </a>
            <Stars rating={rating} />
        </section>
    )
}

export default MovieBlock