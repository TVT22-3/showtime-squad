import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import "./Movies.scss";

const MovieReview = ({ movie, movieId }) => {
  const { userId } = useAuth();
  const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL;

  const [review, setReview] = useState('');
  const [newReviewStars, setNewReviewStars] = useState('');
  const [newReviewText, setNewReviewText] = useState('');

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/review/${movieId}`);
        if (response.ok) {
          const data = await response.json();
          setReview(data);
          console.log("data info:" + data)
          console.log("review info:" + review)
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
      const response = await fetch(`${apiUrl}/api/review/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          movieApi: movieId,
          reviewStars: parseInt(newReviewStars, 10),
          reviewText: newReviewText,
        }),
      });

      if (response.ok) {
        console.log("response ok");
        setNewReviewStars('');
        setNewReviewText('');
        
      } else {
        console.error('Error submitting review:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const renderMovieDetails = () => (
    <div>
      <h2>Movie Details</h2>
      <p>Title: {movie.title}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Overview: {movie.overview}</p>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
    </div>
  );

  const renderReviewSection = () => (
    <div>
      <hr />
      <h2>Reviews for Movie {movie.title}</h2>
      {review.map((review, index) => (
          <li key={index}>
            <p>Stars: {review.reviewStars}</p>
            <p>Review Text: {review.reviewText}</p>
            {/* Add more details as needed */}
          </li>
        ))}
    </div>
  );

  return (
    <div className="movieDetails">
      {renderMovieDetails()}
      {review ? renderReviewSection() : <p>Loading review...</p>}
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


