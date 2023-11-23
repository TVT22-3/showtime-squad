import "./Stars.scss"
import Star from "../../assets/icon/star.jsx"

function Stars({ rating = 2.5 }) {

    return (
        <div className="star-rating stars" data-rating={rating}>
            <span>★★★★★</span>
        </div>
    )
}

function generateStars(count) {
    let stars = [];
    for (let i = 0; i < count; i++) {
        stars.push(<Star key={i} />)
    }
    return (stars)
}

export default Stars