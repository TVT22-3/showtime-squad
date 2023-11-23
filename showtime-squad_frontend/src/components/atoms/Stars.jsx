import "./Stars.scss"
import Star from "../../assets/icon/star.jsx"

function Stars({ rating = 2.5 }) {

    return (
        <div className="star-rating stars" data-rating={rating}>
            <span>★★★★★</span>
        </div>
    )
}

export default Stars