import "./Stars.scss"
import star from "../../assets/icon/star.svg"

function Stars({ rating = 2.5 }) {
    let stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(<img key={i} src={star} alt="★" />)
    }

    return (
        <div className="star-rating stars" data-rating={rating}>
            {stars}
        </div>
    )
}

export default Stars