import React, { useContext, useState, useEffect } from "react";
import { useAuth } from './AuthContext';

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL

// Create a context to manage user-related state
const UserContext = React.createContext();

// UserProvider is a component that provides user-related data to its descendants
const UserProvider = ({ children, test }) => {

  const { logout } = useAuth()
  // State to store the username, retrieved from sessionStorage or an empty string if not present
  const [username, setUsername] = useState(
    sessionStorage.getItem("username") || ""
  );

  // State to store the login status, retrieved from sessionStorage or false if not present
  const [loginStatus, setLoginStatus] = useState(
    test !== undefined ? test : JSON.parse(sessionStorage.getItem("loginStatus")) || false
  );

  // Function to set the logged-in user, updating both state and sessionStorage
  const setLoggedInUser = (newUsername) => {
    setUsername(newUsername);
    sessionStorage.setItem("username", newUsername);
  };

  // Function to set the login status, updating both state and sessionStorage
  const setLoginStatusWrapper = (status) => {
    setLoginStatus(status);
  };

  // Use useEffect to update sessionStorage when loginStatus changes
  useEffect(() => {
    sessionStorage.setItem("loginStatus", JSON.stringify(loginStatus));
  }, [loginStatus]);

  const handleLogout = () => {
    setUsername("");  // Clear username
    setLoginStatus(false);  // Set login status to false
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("loginStatus");
    alert("You have been signed out")
  };

  // Use useEffect to perform the logout when the component mounts
  useEffect(() => {
    const performLogout = async () => {
      const path = window.location.pathname;
      if (path === "/logout") {
        try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            console.log("Logout successful");
            handleLogout();
            logout();
          } else {
            console.error("Logout failed with status:", response.status);
          }
        } catch (error) {
          console.error('Error logging out:', error);
        }
      }
    };

    performLogout(); // Call the async function here

  }, []);

  // Provide the user-related data to its descendants through the context
  return (
    <UserContext.Provider
      value={{
        username,
        setLoggedInUser,
        loginStatus,
        setLoginStatus: setLoginStatusWrapper,
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to easily access the user-related data from the context
const useUser = () => {
  return useContext(UserContext);
};

// Custom hook to easily access the login status and its setter from the context
const useLoginStatus = () => {
  const { loginStatus, setLoginStatus } = useUser();
  return { loginStatus, setLoginStatus };
};

// Export the components and hooks for use in other parts of the application
export { UserProvider, useUser, useLoginStatus };
