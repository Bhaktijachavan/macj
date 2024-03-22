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
      {/* <p className="PhotoReview-Main-Para">
        The photo added to the top-left box will appear on the cover of the
        report <br />
        the drop-down boxes are automatically preloaded with the sectors from
        The photo added to the top left box will appear on the cover of the the
        current template. The photo will print in the location specified using
        both drop-down boxes, unless you check "Print At End" for a photo.
        <br />
        The caption will be placed under each photo unless you check the 'Use
        Location As Caption' button check the 'Summary' box to include the photo
        in the Report Summary in addition to the report body.
      </p> */}
      <div className="PhotoReview-rectangular-container">
        {imagesToRender.map((imageUrl, index) => (
          <Location key={index} imageUrl={imageUrl} />
        ))}
      </div>
    </>
  );
};

export default PhotoReview;
