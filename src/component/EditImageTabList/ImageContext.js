// ImageContext.js
import React, { createContext, useContext, useState } from "react";

const ImageContext = createContext();

export const useImageContext = () => useContext(ImageContext);

export const ImageProvider = ({ children }) => {
  const [lines, setLines] = useState([]);
  const [ovals, setOvals] = useState([]);

  const addLine = (line) => {
    setLines((prevLines) => [...prevLines, line]);
  };

  const addOval = (oval) => {
    setOvals((prevOvals) => [...prevOvals, oval]);
  };

  return (
    <ImageContext.Provider value={{ lines, ovals, addLine, addOval }}>
      {children}
    </ImageContext.Provider>
  );
};
