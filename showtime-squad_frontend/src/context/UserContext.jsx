import React, { useContext, useState, useEffect } from "react";

// Create a context to manage user-related state
const UserContext = React.createContext();

// UserProvider is a component that provides user-related data to its descendants
const UserProvider = ({ children }) => {
  // State to store the username, retrieved from sessionStorage or an empty string if not present
  const [username, setUsername] = useState(
    sessionStorage.getItem("username") || ""
  );

  // State to store the login status, retrieved from sessionStorage or false if not present
  const [loginStatus, setLoginStatus] = useState(
    JSON.parse(sessionStorage.getItem("loginStatus")) || false
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

  // Provide the user-related data to its descendants through the context
  return (
    <UserContext.Provider
      value={{
        username,
        setLoggedInUser,
        loginStatus,
        setLoginStatus: setLoginStatusWrapper,
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
