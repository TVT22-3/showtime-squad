import { Routes, Route, useParams, Navigate } from "react-router-dom";
import Footer from "../../components/ui/Footer";
import Header from "../../components/ui/Header";
import ProfilePage from "../../components/ui/ProfilePage";
import Sitemap from "../../data/sitemap.json";
import LoginRegisterHandler from "../../components/ui/LoginRegisterHandler";
import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";

function Profile() {
  const { username: loggedInUsername } = useUser();
  const { username: routeUsername } = useParams();
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    const checkUserExists = async () => {
      try {
        if (routeUsername) {
          // Make an API call to check if the user exists in the database
          const response = await fetch(`/api/users/${routeUsername}/exists`);
          if (response.ok) {
            setUserExists(true);
          } else {
            setUserExists(false);
          }
        } else if (loggedInUsername) {
          // If no username is specified but the user is logged in, assume the profile of the logged-in user is being accessed
          setUserExists(true);
        }
      } catch (error) {
        console.error("Error checking user existence", error);
      }
    };

    checkUserExists();
  }, [routeUsername, loggedInUsername]);

  if (!userExists) {
    // Handle the case where the user doesn't exist, e.g., redirect or show an error page
    return <p>User not found</p>;
  }

  return (
    <>
      <Header />
      <ProfilePage />
      <Footer sitemap={Sitemap} loggedIn={true} />
    </>
  );
}

export default Profile;
