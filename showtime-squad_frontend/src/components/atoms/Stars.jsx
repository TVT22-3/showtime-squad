import "./Stars.scss"
import Star from "../../assets/icon/star.jsx"

function Stars({ rating = -1.0 }) {

    return (
        <div className="star-rating stars" data-rating={rating}>
            <span>★★★★★</span>
        </div>
    )
}

export default Stars