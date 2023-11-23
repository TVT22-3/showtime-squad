// MyContext.js
import React, { createContext, useState, useContext } from 'react';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [clickedButton, setClickedButton] = useState(null);

  const setClicked = (categoryAndOption) => {
    setClickedButton(categoryAndOption);
  };

  const [clickedCategory, setClickedCategory] = useState(null);

  const setCategory = (category) => {
    setClickedCategory(category)
  }

  const [clickedOption, setClickedOption] = useState(null);

  const setOption = (option) => {
    setClickedOption(option)
  }

  return (
    <MyContext.Provider value={{ clickedButton, setClicked , clickedCategory, setCategory, clickedOption, setOption}}>
      {children}
    </MyContext.Provider>
  );
};

const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};

export { MyContext, MyContextProvider, useMyContext };
