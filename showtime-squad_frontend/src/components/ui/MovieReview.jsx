import React, { useState, useEffect } from 'react';

const MovieReview = ({ movieId }) => {
  const [review, setReview] = useState(null);
  const [newReviewStars, setNewReviewStars] = useState('');
  const [newReviewText, setNewReviewText] = useState('');

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetch(`/api/reviews/${movieId}`);
        if (response.ok) {
          const data = await response.json();
          setReview(data);
        } else {
          console.error('Error fetching review:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching review:', error);
      }
    };

    fetchReview();
  }, [movieId]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 1, // Replace with the actual user ID
          movieApi: movieId,
          reviewStars: parseInt(newReviewStars, 10),
          reviewText: newReviewText,
        }),
      });

      if (response.ok) {
        // Refresh the review after a successful POST
        setNewReviewStars('');
        setNewReviewText('');
        fetchReview();
      } else {
        console.error('Error submitting review:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div>
      {review ? (
        <div>
          <h2>Review for Movie {movieId}</h2>
          <p>Stars: {review.reviewStars}</p>
          <p>Review Text: {review.reviewText}</p>
        </div>
      ) : (
        <p>Loading review...</p>
      )}

      <hr />

      <h2>Submit a Review</h2>
      <form onSubmit={handleReviewSubmit}>
        <label>
          Stars:
          <input
            type="number"
            value={newReviewStars}
            onChange={(e) => setNewReviewStars(e.target.value)}
          />
        </label>
        <br />
        <label>
          Review Text:
          <textarea
            value={newReviewText}
            onChange={(e) => setNewReviewText(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default MovieReview;

