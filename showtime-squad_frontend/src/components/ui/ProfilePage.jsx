import "./Profile.scss";
import { useUser } from "../../context/UserContext.jsx";
import View from "./View.jsx";

export default function ProfilePage() {
  const { username } = useUser();

  return (
    <div id="profile">
      <div className="profile-container">
        <div className="profile-top">
          <img src="https://via.placeholder.com/100" alt="Profile" />
          <div className="description">
            <h2>{username}</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
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
