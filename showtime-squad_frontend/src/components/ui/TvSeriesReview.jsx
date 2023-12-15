import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import "./MovieReview.scss"

const TvSeriesReview = ({ tvSeries, tvSeriesId }) => {
    const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL

    const [review, setReview] = useState([])
    const [newReviewStars, setNewReviewStars] = useState('')
    const [newReviewText, setNewReviewText] = useState('')
    const [showSubmitOk, setShowSubmitOk] = useState(false)
    const [showSubmitFail, setShowSubmitFail] = useState(false)

    const fetchReview = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/review/?movieId=${tvSeriesId}`)
            if (response.ok) {
                const data = await response.json()
                setReview(data)
            } else {
                console.error('Error fetching review:', response.statusText)
            }
        } catch (error) {
            console.error('Error fetching review:', error)
        }
    }

    useEffect(() => {
        // Fetch reviews when the component mounts
        fetchReview()
    }, [tvSeriesId])

    const handleReviewSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`${apiUrl}/api/review/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    movieApi: tvSeriesId,
                    reviewStars: parseInt(newReviewStars, 10),
                    reviewText: newReviewText,
                }),
            })

            if (response.ok) {
                console.log("response ok")
                setNewReviewStars('')
                setNewReviewText('')
                // Fetch reviews after a new review is submitted
                fetchReview()

                // Show "Submit OK" for 2 seconds
                setShowSubmitOk(true)
                setTimeout(() => {
                    setShowSubmitOk(false)
                }, 3000)
            } else {
                console.error('Error submitting review:', response.statusText)
                setShowSubmitFail(true)
                setTimeout(() => {
                    setShowSubmitFail(false)
                }, 3000)
            }
        } catch (error) {
            console.error('Error submitting review:', error)
        }
    }


    const renderMovieDetails = () => (
        <div>
            <h2>Series Details</h2>
            <p>Title: {tvSeries.name}</p>
            <p>First air date: {tvSeries.first_air_date || "TBA"}</p>
            <p>Overview: {tvSeries.overview}</p>
            <img src={`https://image.tmdb.org/t/p/w500${tvSeries.poster_path}`} alt={tvSeries.name} />
        </div>
    )

    const renderReviewSection = () => (
        <div>
            <h2>Reviews for {tvSeries.name}</h2>
            {review.length > 0 ? (
                review.map((review, index) => (
                    <li key={index}>
                        < hr />
                        <p>Username: {review.username}</p>
                        <p>Stars: {review.reviewStars}</p>
                        <p>Review Text: {review.reviewText}</p>
                        {/* Add more details as needed */}
                    </li>
                ))
            ) : (
                <p>No reviews yet!</p>
            )}
        </div>
    )



    return (
        <div className="movieDetails">
            {renderMovieDetails()}
            <hr />
            <h2>Submit a Review</h2>
            <form onSubmit={handleReviewSubmit}>
                <label>
                    Stars 0-5:
                    <input
                        type="number"
                        value={newReviewStars}
                        onChange={(e) => setNewReviewStars(e.target.value)}
                        required
                        min="0"
                        max="5"
                        pattern="[0-5]"
                    />
                </label>
                <br />
                <label>
                    Review Text:
                    <textarea
                        value={newReviewText}
                        onChange={(e) => setNewReviewText(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">Submit Review</button>
                {showSubmitOk && <span className="submit-ok">     Submit OK</span>}
                {showSubmitFail && <span className="submit-fail">    You need to sign in to submit review!</span>}
            </form>
            {review ? renderReviewSection() : <p>Reviews not available!</p>}
        </div>
    )
}

export default TvSeriesReview