// ModeContext.js
import React, { useContext, useState } from 'react';

const FilterMoviesContext = React.createContext();

export const FilterMoviesProvider = ({ children }) => {
  const [currentMode, setCurrentMode] = useState('search');
  const [currentPayload, setCurrentPayload] = useState(null);

  const switchMode = (mode, payload = null) => {
    setCurrentMode(mode);
    setCurrentPayload(payload);
  };

  console.log('Current Mode:', currentMode);

  return (
    <FilterMoviesContext.Provider value={{ currentMode, currentPayload, switchMode }}>
      {children}
    </FilterMoviesContext.Provider>
  );
};

export const useFilterMoviesContext = () => {
  return useContext(FilterMoviesContext);
};

