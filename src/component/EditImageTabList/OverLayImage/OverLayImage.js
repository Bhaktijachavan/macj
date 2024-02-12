import React, { useState, useRef } from "react";
import "./OverLayImage.css";
// import Draggable from "react-draggable";
const OverLayImage = ({ imageUrl, onTextChange }) => {
  const [text, setText] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [texts, setTexts] = useState([]);
  const changesHistory = useRef([]);
  const [uploadedPhoto, setUploadedPhoto] = useState(null); // State to hold the uploaded photo
  const fileInputRef = useRef(null); // Reference to the file input element
  const historyIndex = useRef(-1);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  const handleSelectButtonClick = () => {
    // Trigger the file input's click event when the "Select" button is clicked
    fileInputRef.current.click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Get the first file from the selected files
    if (file) {
      const reader = new FileReader(); // Create a file reader object
      reader.onloadend = () => {
        // Callback function to handle when the file reading is completed
        setUploadedPhoto(reader.result); // Set the uploaded photo as data URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const undo = () => {
    if (historyIndex.current > 0) {
      historyIndex.current--;
      setTexts(changesHistory.current[historyIndex.current]);
    }
  };

  const redo = () => {
    if (historyIndex.current < changesHistory.current.length - 1) {
      historyIndex.current++;
      setTexts(changesHistory.current[historyIndex.current]);
    }
  };
  const handleRotateClockwise = () => {
    const newRotationAngle = (rotationAngle + 90) % 360;
    setRotationAngle(newRotationAngle);
    // Add new rotation angle to history
  };

  return (
    <>
      <div className="Overlay-Image-container-to-overlay-image-super-container">
        <img
          src={imageUrl}
          alt="Original Image"
          className="Overlay-Image-image-uploded"
        />
        {uploadedPhoto && (
          <img
            src={uploadedPhoto}
            alt="Uploaded"
            className="Overlay-Image-overlay"
            style={{ transform: `rotate(${rotationAngle}deg)` }}
          />
        )}
        {isPopupOpen && (
          <div className="Overlay-for-edit-images-tablist-section-main-container ">
            <div className=" Overlay-for-edit-images-tablist-section-header-container">
              <div>
                <p>Crop Image</p>
              </div>
              <div onClick={handleClosePopup}>
                <button className="OverlayImage-close-image-x">X</button>
              </div>
            </div>
            <div className="paracontainer-para">
              Click on move mouse to mark area.Click again to crop.Press Ok to
              insert Image
            </div>
            <div className="button-continer-rotate-super-container">
              <div className="Rotate-Button-to-rotate-Overlay-image-container">
                <button
                  className="Rotate-Button-to-rotate-Overlay-image"
                  onClick={handleSelectButtonClick}
                >
                  Select
                </button>
                <button
                  className="Rotate-Button-to-rotate-Overlay-image"
                  onClick={handleRotateClockwise}
                >
                  Rotate
                </button>
              </div>
              <div className="photo-container-photo-is-reviewed">
                {uploadedPhoto && (
                  <img
                    src={uploadedPhoto}
                    alt="Uploaded"
                    style={{ transform: `rotate(${rotationAngle}deg)` }}
                    // className="photo-container-photo-is-reviewed"
                  />
                )}
              </div>
            </div>
            <div className="Buttons-to-add-overlay-image-ok-cancel-button">
              <div className="ok-cancel-button-overlay-image">
                <button>Ok</button>
              </div>
              <div className="ok-cancel-button-overlay-image">
                <button>Cancel</button>
              </div>
            </div>
          </div>
        )}
        {texts.map((t) => (
          <div
            className="text-overlay"
            style={{
              color: t.textColor,
              position: "absolute",
              top: `${t.position.y}%`,
              left: `${t.position.x}%`,
              fontSize: `${t.fontSize}px`,
              fontFamily: t.font,
              fontWeight: t.isBold ? "bold" : "normal",
              fontStyle: t.isItalic ? "italic" : "normal",
              backgroundColor: t.isHighlighted
                ? `${t.highlightColor}${Math.round(
                    t.highlightOpacity * 255
                  ).toString(16)}`
                : "transparent",
              textAlign: "center",
              cursor: "move",
            }}
          >
            {t.content}
          </div>
        ))}
      </div>
      <div className="Buttons-undo-redo-conatainer">
        <button className="Buttons-undo-redo-yytytyt" onClick={undo}>
          Undo
        </button>
        <button className="Buttons-undo-redo-yytytyt" onClick={redo}>
          Redo
        </button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />
    </>
  );
};

export default OverLayImage;
