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
  }, [profileUsername, loggedInUsername]);

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
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        <div className="favorite-movies">
          <View />
        </div>

        <div className="recent-reviews">
          <h1>Recent Reviews</h1>
          <div className="review-container">
            <div className="review-item">
              <img
                src="https://via.placeholder.com/100x150"
                alt="Movie Poster"
              />
              <div className="review-text">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  bibendum sem diam, eget laoreet odio gravida sed. Etiam quis
                  lorem eget orci molestie ultricies a ac nisi. Aliquam lobortis
                  eros vehicula magna posuere, nec pellentesque ipsum interdum.
                  In nec imperdiet quam, ut sollicitudin massa. Mauris elit
                  nisl, tincidunt eget lobortis vitae, efficitur vel tortor. Ut
                  tincidunt vestibulum metus vel condimentum. Class aptent
                  taciti sociosqu ad litora torquent per conubia nostra, per
                  inceptos himenaeos. Sed sed nibh mi. Suspendisse porttitor dui
                  id nisi porttitor volutpat euismod eget lacus. Aliquam erat
                  volutpat. Nam porta diam at porta varius. Nullam sapien leo,
                  dignissim viverra aliquet faucibus, molestie id ligula. Class
                  aptent taciti sociosqu ad litora torquent per conubia nostra,
                  per inceptos himenaeos.
                </p>
              </div>
            </div>
            <div className="review-item">
              <img
                src="https://via.placeholder.com/100x150"
                alt="Movie Poster"
              />
              <div className="review-text">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  bibendum sem diam, eget laoreet odio gravida sed. Etiam quis
                  lorem eget orci molestie ultricies a ac nisi. Aliquam lobortis
                  eros vehicula magna posuere, nec pellentesque ipsum interdum.
                  In nec imperdiet quam, ut sollicitudin massa. Mauris elit
                  nisl, tincidunt eget lobortis vitae, efficitur vel tortor. Ut
                  tincidunt vestibulum metus vel condimentum. Class aptent
                  taciti sociosqu ad litora torquent per conubia nostra, per
                  inceptos himenaeos. Sed sed nibh mi. Suspendisse porttitor dui
                  id nisi porttitor volutpat euismod eget lacus. Aliquam erat
                  volutpat. Nam porta diam at porta varius. Nullam sapien leo,
                  dignissim viverra aliquet faucibus, molestie id ligula. Class
                  aptent taciti sociosqu ad litora torquent per conubia nostra,
                  per inceptos himenaeos.
                </p>
              </div>
            </div>
            <div className="review-item">
              <img
                src="https://via.placeholder.com/100x150"
                alt="Movie Poster"
              />
              <div className="review-text">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  bibendum sem diam, eget laoreet odio gravida sed. Etiam quis
                  lorem eget orci molestie ultricies a ac nisi. Aliquam lobortis
                  eros vehicula magna posuere, nec pellentesque ipsum interdum.
                  In nec imperdiet quam, ut sollicitudin massa. Mauris elit
                  nisl, tincidunt eget lobortis vitae, efficitur vel tortor. Ut
                  tincidunt vestibulum metus vel condimentum. Class aptent
                  taciti sociosqu ad litora torquent per conubia nostra, per
                  inceptos himenaeos. Sed sed nibh mi. Suspendisse porttitor dui
                  id nisi porttitor volutpat euismod eget lacus. Aliquam erat
                  volutpat. Nam porta diam at porta varius. Nullam sapien leo,
                  dignissim viverra aliquet faucibus, molestie id ligula. Class
                  aptent taciti sociosqu ad litora torquent per conubia nostra,
                  per inceptos himenaeos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
