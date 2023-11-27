import { createContext, useContext, useState } from 'react'

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('')

  const setLoggedInUser = (newUsername) => {
    setUsername(newUsername);
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
