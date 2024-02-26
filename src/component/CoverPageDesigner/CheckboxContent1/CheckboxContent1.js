import React from "react";
import "./CheckboxContent1.css";

const CheckboxContent1 = () => {
  const coverphotoImage = localStorage.getItem("coverphotoImage");

  return (
    <>
      <div className="content-for-the-cover-photo-check-box">
        {coverphotoImage ? (
          <img src={coverphotoImage} alt="Cover Photo" />
        ) : (
          "Cover Photo"
        )}
      </div>
    </>
  );
};

export default CheckboxContent1;
