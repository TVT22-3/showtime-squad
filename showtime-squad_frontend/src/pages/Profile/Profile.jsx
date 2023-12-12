import { Routes, Route, useParams } from "react-router-dom";
import Footer from "../../components/ui/Footer";
import Header from "../../components/ui/Header";
import ProfilePage from "../../components/ui/ProfilePage";
import Sitemap from "../../data/sitemap.json";
import LoginRegisterHandler from "../../components/ui/LoginRegisterHandler";
import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";

function Profile() {
  // TODO: Implement
  console.log("component not properly implemented");

  const { username } = useParams() || useUser();
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    // Make an API call to check if the user exists in the database
    const checkUserExists = async () => {
      try {
        const response = await fetch(`/api/users/${username}`);
        if (response.ok) {
          setUserExists(true);
        } else {
          setUserExists(false);
        }
      } catch (error) {
        console.error("Error checking user existence", error);
      }
    };

    if (username) {
      checkUserExists();
    }
  }, [username]);

  if (!userExists) {
    // Handle the case where the user doesn't exist, e.g., redirect or show an error page
    return <p>User not found</p>;
  }

  return (
    <>
      <Header />
      <ProfilePage />
      {/*<Routes>
                <Route path="/login" element={<LoginRegisterHandler />} />
    </Routes>*/}
      <Footer sitemap={Sitemap} loggedIn={true} />
    </>
  );
}

export default Profile;
