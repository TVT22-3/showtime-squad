import React, { useContext, useState, useEffect } from 'react';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(sessionStorage.getItem('userId'));

    // Update session storage when userId changes
    useEffect(() => {
      if (userId) {
        sessionStorage.setItem('userId', userId);
      } else {
        sessionStorage.removeItem('userId');
      }
    }, [userId]);

  const login = (userId) => {
    setUserId(userId);
    console.log("userid:" + userId)
  };

  const logout = () => {
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
