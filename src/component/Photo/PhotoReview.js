import React, { useCallback, useState, useContext, useEffect } from "react";
import "./PhotoReview.css";
import Location from "./Location";

const PhotoReview = () => {
  return (
    <>
      <p className="PhotoReview-Main-Para">
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
      </p>
      <div className="PhotoReview-rectangular-container">
        <Location />
        <Location />
        <Location />
        <Location />
      </div>
    </>
  );
};

export default PhotoReview;
