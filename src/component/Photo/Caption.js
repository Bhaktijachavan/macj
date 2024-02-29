import React, { useState } from "react";
import img7 from "./icons/notes.png";
import close from "./icons/close_2997911.png";
import "./Caption.css";
import Buttons from "./Buttons";

const Caption = () => {
  const [captionValue, setCaptionValue] = useState("");
  const [popupCaptionValue, setPopupCaptionValue] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupOpen = () => {
    setPopupCaptionValue(captionValue); // Copy text to popup input field
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSaveChanges = () => {
    setCaptionValue(popupCaptionValue); // Save changes to the main input field
    setIsPopupOpen(false);
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
      {/* <label>Caption</label> */}
      <div className="Caption-main-container">
        {/* <div className="Caption-main-label-name"> */}
        {/* <label >Caption</label> */}
        <div className="caption-main-input-field">
          <input
            className="Caption-main-input-filed"
            value={captionValue}
            onChange={handleInputChange}
          />
        </div>
        {/* </div> */}
        <div className="caption-image-edit-caption-container">
          <img
            src={img7}
            alt=""
            className="Caption-image-toopen-popupbox"
            onClick={handlePopupOpen}
          />

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
        </div>
      </div>
    </>
  );
};

export default Caption;
