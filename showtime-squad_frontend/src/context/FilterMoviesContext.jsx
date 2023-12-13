// ModeContext.js
import React, { createContext, useContext, useState } from 'react';

const FilterMoviesContext = createContext();

export const FilterMoviesProvider = ({ children }) => {
  const [currentMode, setCurrentMode] = useState(null);
  const [currentPayload, setCurrentPayload] = useState(null);

  const switchMode = (mode, payload = null) => {
    setCurrentMode(mode);
    setCurrentPayload(payload);
  };


  return (
    <FilterMoviesContext.Provider value={{ currentMode, currentPayload, switchMode }}>
      {children}
    </FilterMoviesContext.Provider>
  );
};

export const useFilterMoviesContext = () => {
  return useContext(FilterMoviesContext);
};

