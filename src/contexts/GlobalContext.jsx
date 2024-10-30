import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("");

  const handleNavigation = (url, title) => {
    setActiveLink(title); 
    navigate(url); 
  };

  return (
    <GlobalContext.Provider value={{ activeLink, handleNavigation, navigate }}>
      {children}
    </GlobalContext.Provider>
  );
};
