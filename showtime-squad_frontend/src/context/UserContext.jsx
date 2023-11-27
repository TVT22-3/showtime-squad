import React, { useContext, useState } from 'react'

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(sessionStorage.getItem('username') || '');

  const setLoggedInUser = (newUsername) => {
    setUsername(newUsername);
    sessionStorage.setItem('username', newUsername);
  }

  return (
    <UserContext.Provider value={{ username, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  )
}

const useUser = () => {
  return useContext(UserContext)
}

export { UserProvider, useUser }
