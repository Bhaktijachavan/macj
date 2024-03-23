import React, { useEffect } from "react";
import "./PhotoReview.css";
import Location from "./Location";

const PhotoReview = ({ images }) => {
  // Ensure images array has at least 4 elements
  const imagesToRender = images.concat(
    Array.from({ length: Math.max(4 - images.length, 0) }).fill(null)
  );

  useEffect(() => {
    console.log("images ", images);
  });

  return (
    <>
      <div className="PhotoReview-rectangular-container">
        {imagesToRender.map((imageUrl, index) => (
          <Location key={index} imageUrl={imageUrl} />
        ))}
      </div>
    </>
  );
};

export default PhotoReview;
