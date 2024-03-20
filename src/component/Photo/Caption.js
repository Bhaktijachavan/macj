import React, { useEffect, useState } from "react";
import img7 from "./icons/notes.png";
import close from "./icons/close_2997911.png";
import "./Caption.css";
import Buttons from "./Buttons";

const Caption = ({ setCap, caption, id, index }) => {
  const [captionValue, setCaptionValue] = useState(caption);
  const [popupCaptionValue, setPopupCaptionValue] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    setCap(captionValue);
  }, [captionValue]);

  const handlePopupOpen = () => {
    setPopupCaptionValue(captionValue); // Copy text to popup input field
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSaveChanges = (newCaption) => {
    try {
      let imageData = localStorage.getItem("coverphotoImage");
      if (!imageData) {
        return alert("No image data found.");
      }

      imageData = JSON.parse(imageData);

      // Check if the id exists in the imageData
      if (!Array.isArray(imageData[id])) {
        return alert("No images found for the provided ID.");
      }

      // Check if the index is valid
      if (index < 0 || index >= imageData[id].length) {
        return alert("Invalid index.");
      }

      // Update the caption at the specified index
      imageData[id][index].caption = popupCaptionValue;
      setCaptionValue(popupCaptionValue);

      // Save the updated image data to local storage
      localStorage.setItem("coverphotoImage", JSON.stringify(imageData));

      alert("Caption updated successfully.");
    } catch (error) {
      console.error("Error updating caption:", error);
    }
  };

  const handleDiscardChanges = () => {
    setIsPopupOpen(false);
  };

  const handleInputChange = (e) => {
    setCaptionValue(e.target.value);
  };

  const handlePopupInputChange = (e) => {
    setPopupCaptionValue(e.target.value);
  };

  return (
    <>
      <fieldset className="bordered-text-caption ">
        {/* <legend className="tag-for-line-draw-through-text">Caption</legend> */}

        <div className="caption-main-input-field-container">
          <input
            className="Caption-main-input-filed"
            value={captionValue}
            placeholder="Caption:  "
            title="Add Caption"
            onChange={handleInputChange}
          />
          <div>
            <img
              src={img7}
              alt=""
              title="Edit caption"
              className="Caption-image-toopen-popupbox"
              onClick={handlePopupOpen}
            />
          </div>
        </div>
      </fieldset>

      {isPopupOpen && (
        <div className="Caption-main-popup-container">
          <div className="caption-popup-caption-editor-container">
            <label className="caption-popup-caption-editor">
              Caption Editor
            </label>
            <div className="caption-popup-close-image-container">
              {/* <img
                  src={close}
                  className="caption-popup-close-image"
                  onClick={handleClosePopup}
                /> */}
              <p
                className="caption-popup-close-image"
                onClick={handleClosePopup}
              >
                X
              </p>
            </div>
          </div>

          <br />

          <textarea
            className="caption-popupbox-input-filed"
            value={popupCaptionValue}
            onChange={handlePopupInputChange}
          />
          <br />
          <div className="caption-popupbox-buttons-main-container">
            <div className="caption-popupbox-Buttons">
              <button
                className="caption-popupbox-btns"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
            <div className="caption-popupbox-Buttons">
              <button
                className="caption-popupbox-btns"
                onClick={handleDiscardChanges}
              >
                Discard Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Caption;
