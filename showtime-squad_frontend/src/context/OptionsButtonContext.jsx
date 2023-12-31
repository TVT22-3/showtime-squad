// MyContext.js
import React, { createContext, useState, useContext } from 'react';

const OptionsButtonContext = createContext();

// @param type: {}, pass in default category and option via 
// @var clickedButton tracks which button was clicked, mostly useful for debugging
// @var clickedCategory tracks which category was clicked, parsing is up to caller
// @var clickedOption tracks which option was clicked, parsing is up to caller
const OptionsButtonContextProvider = ({ children, type: { category, option } }) => {

  const [clickedButton, setClickedButton] = useState(null);

  const setClicked = (categoryAndOption) => {
    setClickedButton(categoryAndOption);
  };

  const [clickedCategory, setClickedCategory] = useState(category);

  const setCategory = (category) => {
    setClickedCategory(category)
  }

  const [clickedOption, setClickedOption] = useState(option);

  const setOption = (option) => {
    setClickedOption(option)
  }

  return (
    <OptionsButtonContext.Provider value={{ clickedButton, setClicked, clickedCategory, setCategory, clickedOption, setOption }}>
      {children}
    </OptionsButtonContext.Provider>
  );
};

const useOptionsButtonContext = () => {
  const context = useContext(OptionsButtonContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};

export { OptionsButtonContext, OptionsButtonContextProvider, useOptionsButtonContext };
