// DrawContext.js
import React, { createContext, useState, useContext } from "react";

const DrawContext = createContext();

export const useDraw = () => useContext(DrawContext);

export const DrawProvider = ({ children }) => {
  const [lines, setLines] = useState([]);
  const [arrows, setArrows] = useState([]);
  const [ovals, setOvals] = useState([]);
  const [rectangles, setRectangles] = useState([]);

  const addLine = (line) => setLines([...lines, line]);
  const addArrow = (arrow) => setArrows([...arrows, arrow]);
  const addOval = (oval) => setOvals([...ovals, oval]);
  const addRectangle = (rectangle) => setRectangles([...rectangles, rectangle]);

  return (
    <DrawContext.Provider
      value={{
        lines,
        arrows,
        ovals,
        rectangles,
        addLine,
        addArrow,
        addOval,
        addRectangle,
      }}
    >
      {children}
    </DrawContext.Provider>
  );
};
