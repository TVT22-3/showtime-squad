import "./Profile.scss";
import { useUser } from "../../context/UserContext.jsx";
import View from "./View.jsx";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ProfilePage() {
  const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL;
  const { username: loggedInUsername } = useUser();
  const { username: profileUsername } = useParams();
  const [profilePicture, setProfilePicture] = useState("");
  const [loading, setLoading] = useState(true);
  const displayUsername = profileUsername || loggedInUsername;
  const [recentReviews, setRecentReviews] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});

  // Fetch movie details for each movieApi in recentReviews
  useEffect(() => {
    const fetchMovieDetails = async (movieApi) => {
      try {
        const response = await fetch(`${apiUrl}/movies/id?id=${movieApi}`);
        const data = await response.json();
        setMovieDetails((prevDetails) => ({
          ...prevDetails,
          [movieApi]: {
            posterPath: data.poster_path,
            title: data.title,
          },
        }));
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    recentReviews.forEach((review) => {
      fetchMovieDetails(review.movieApi);
    });
  }, [recentReviews, apiUrl]);

  // Fetch profile picture
  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api/users/${displayUsername}/profilepicture`,
          { credentials: "include" }
        );
        const data = await response.text();
        setProfilePicture(data);
      } catch (error) {
        console.error("Error fetching profile picture", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfilePicture();
  }, [profileUsername, loggedInUsername, apiUrl]);

  // Fetch recent reviews
  useEffect(() => {
    fetch(`${apiUrl}/api/review/user/${displayUsername}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setRecentReviews(data))
      .catch((error) => console.error("Error fetching recent reviews:", error));
  }, [displayUsername, apiUrl]);

  return (
    <div id="profile">
      <div className="profile-container">
        <div className="profile-top">
          <img
            src={profilePicture}
            alt="Profile Picture"
            height={150}
            width={150}
          />
          <div className="description">
            <h2>{displayUsername}</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        <div className="favorite-movies">
          <View />
        </div>

        <div className="recent-reviews">
          <h1>Recent Reviews</h1>
          <div className="review-container">
            {recentReviews
              .slice(-3)
              .reverse()
              .map((review) => (
                <div className="review-item" key={review.id}>
                  {movieDetails[review.movieApi] && (
                    <img
                      src={`https://image.tmdb.org/t/p/original/${
                        movieDetails[review.movieApi].posterPath
                      }`}
                      alt="Movie Poster"
                    />
                  )}
                  <div className="review-text">
                    <h3>
                      {movieDetails[review.movieApi] &&
                        movieDetails[review.movieApi].title}
                    </h3>
                    <p>{review.reviewText}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
