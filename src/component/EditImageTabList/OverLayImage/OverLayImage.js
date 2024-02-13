import React, { useState, useRef, useEffect } from "react";
import "./OverLayImage.css";
// import Draggable from "react-draggable";
const OverLayImage = ({
  imageUrl,

  drawnArrows,
  brightness,
  contrast,
  drawnLines,
  drawnOvals,
  drawnRectangles,
  croppedImageUrl,
}) => {
  const [text, setText] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [texts, setTexts] = useState([]);
  const changesHistory = useRef([]);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const fileInputRef = useRef(null);
  const historyIndex = useRef(-1);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.ctrlKey && event.key === "z") {
        undo();
      } else if (event.ctrlKey && event.key === "y") {
        redo();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []); // Empty dependency array to run only once

  useEffect(() => {
    if (croppedImageUrl) {
      setImageSrc(croppedImageUrl);
    } else {
      setImageSrc(imageUrl); // Set to original image URL
    }
  }, [croppedImageUrl]);

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
          src={imageSrc}
          alt="Original Image"
          className="Overlay-Image-image-uploded"
          style={{
            filter: `brightness(${brightness}%) contrast(${contrast}%)`,
          }}
        />
        {texts &&
          texts.map((text) => (
            <div
              key={text.id}
              className="text-overlay"
              style={{
                color: text.textColor,
                position: "absolute",
                top: `${text.position.y}%`,
                left: `${text.position.x}%`,
                fontSize: `${text.fontSize}px`,
                fontFamily: text.font,
                fontWeight: text.isBold ? "bold" : "normal",
                fontStyle: text.isItalic ? "italic" : "normal",
                backgroundColor: text.isHighlighted
                  ? `${text.highlightColor}${Math.round(
                      text.highlightOpacity * 255
                    ).toString(16)}`
                  : "transparent",
                textAlign: "center",
              }}
            >
              {text.content}
            </div>
          ))}
        {drawnArrows &&
          drawnArrows.map((arrow, index) => {
            // Calculate the angle of the arrow
            const angle = Math.atan2(
              arrow.end.y - arrow.start.y,
              arrow.end.x - arrow.start.x
            );
            // Calculate the length of the arrowhead lines
            const arrowheadLength = 10;
            // Calculate the coordinates of the arrowhead
            const arrowheadX1 =
              arrow.end.x - arrowheadLength * Math.cos(angle - Math.PI / 6);
            const arrowheadY1 =
              arrow.end.y - arrowheadLength * Math.sin(angle - Math.PI / 6);
            const arrowheadX2 =
              arrow.end.x - arrowheadLength * Math.cos(angle + Math.PI / 6);
            const arrowheadY2 =
              arrow.end.y - arrowheadLength * Math.sin(angle + Math.PI / 6);

            return (
              <div
                key={index}
                className="drawn-arrow"
                style={{
                  position: "absolute",
                  top: `${Math.min(arrow.start.y, arrow.end.y)}px`,
                  left: `${Math.min(arrow.start.x, arrow.end.x)}px`,
                }}
              >
                <svg
                  width={`${Math.abs(arrow.end.x - arrow.start.x)}px`}
                  height={`${Math.abs(arrow.end.y - arrow.start.y)}px`}
                  viewBox={`0 0 ${Math.abs(
                    arrow.end.x - arrow.start.x
                  )} ${Math.abs(arrow.end.y - arrow.start.y)}`}
                >
                  <line
                    x1={Math.abs(
                      arrow.start.x - Math.min(arrow.start.x, arrow.end.x)
                    )}
                    y1={Math.abs(
                      arrow.start.y - Math.min(arrow.start.y, arrow.end.y)
                    )}
                    x2={Math.abs(
                      arrow.end.x - Math.min(arrow.start.x, arrow.end.x)
                    )}
                    y2={Math.abs(
                      arrow.end.y - Math.min(arrow.start.y, arrow.end.y)
                    )}
                    style={{ stroke: arrow.color, strokeWidth: "4" }}
                  />
                  {/* Arrowhead */}
                  <line
                    x1={arrowheadX1 - Math.min(arrow.start.x, arrow.end.x)}
                    y1={arrowheadY1 - Math.min(arrow.start.y, arrow.end.y)}
                    x2={arrow.end.x - Math.min(arrow.start.x, arrow.end.x)}
                    y2={arrow.end.y - Math.min(arrow.start.y, arrow.end.y)}
                    style={{ stroke: arrow.color, strokeWidth: "2" }}
                  />
                  <line
                    x1={arrowheadX2 - Math.min(arrow.start.x, arrow.end.x)}
                    y1={arrowheadY2 - Math.min(arrow.start.y, arrow.end.y)}
                    x2={arrow.end.x - Math.min(arrow.start.x, arrow.end.x)}
                    y2={arrow.end.y - Math.min(arrow.start.y, arrow.end.y)}
                    style={{ stroke: arrow.color, strokeWidth: "2" }}
                  />
                </svg>
              </div>
            );
          })}
        {drawnLines &&
          drawnLines.map((line, index) => (
            <svg
              key={index}
              width={`${Math.abs(line.end.x - line.start.x)}px`}
              height={`${Math.abs(line.end.y - line.start.y)}px`}
              viewBox={`0 0 ${Math.abs(line.end.x - line.start.x)} ${Math.abs(
                line.end.y - line.start.y
              )}`}
              style={{
                position: "absolute",
                top: `${Math.min(line.start.y, line.end.y)}px`,
                left: `${Math.min(line.start.x, line.end.x)}px`,
              }}
            >
              <line
                x1={Math.abs(line.start.x - Math.min(line.start.x, line.end.x))}
                y1={Math.abs(line.start.y - Math.min(line.start.y, line.end.y))}
                x2={Math.abs(line.end.x - Math.min(line.start.x, line.end.x))}
                y2={Math.abs(line.end.y - Math.min(line.start.y, line.end.y))}
                style={{ stroke: line.color, strokeWidth: "4" }}
              />
            </svg>
          ))}
        {drawnRectangles &&
          drawnRectangles.map((rectangle, index) => {
            return (
              <svg
                key={index}
                width={`${Math.abs(rectangle.end.x - rectangle.start.x)}px`}
                height={`${Math.abs(rectangle.end.y - rectangle.start.y)}px`}
                viewBox={`0 0 ${Math.abs(
                  rectangle.end.x - rectangle.start.x
                )} ${Math.abs(rectangle.end.y - rectangle.start.y)}`}
                style={{
                  position: "absolute",
                  top: `${Math.min(rectangle.start.y, rectangle.end.y)}px`,
                  left: `${Math.min(rectangle.start.x, rectangle.end.x)}px`,
                }}
              >
                <rect
                  x={Math.abs(
                    rectangle.start.x -
                      Math.min(rectangle.start.x, rectangle.end.x)
                  )}
                  y={Math.abs(
                    rectangle.start.y -
                      Math.min(rectangle.start.y, rectangle.end.y)
                  )}
                  width={Math.abs(rectangle.end.x - rectangle.start.x)}
                  height={Math.abs(rectangle.end.y - rectangle.start.y)}
                  style={{
                    stroke: rectangle.color,
                    strokeWidth: "4",
                    fill: "none",
                  }}
                />
              </svg>
            );
          })}

        {drawnOvals &&
          drawnOvals.map((oval, index) => {
            const centerX =
              Math.min(oval.start.x, oval.end.x) +
              Math.abs(oval.end.x - oval.start.x) / 2;
            const centerY =
              Math.min(oval.start.y, oval.end.y) +
              Math.abs(oval.end.y - oval.start.y) / 2;
            const radiusX = Math.abs(oval.end.x - oval.start.x) / 2;
            const radiusY = Math.abs(oval.end.y - oval.start.y) / 2;

            return (
              <svg
                key={index}
                width={`${Math.abs(oval.end.x - oval.start.x)}px`}
                height={`${Math.abs(oval.end.y - oval.start.y)}px`}
                viewBox={`0 0 ${Math.abs(oval.end.x - oval.start.x)} ${Math.abs(
                  oval.end.y - oval.start.y
                )}`}
                style={{
                  position: "absolute",
                  top: `${Math.min(oval.start.y, oval.end.y)}px`,
                  left: `${Math.min(oval.start.x, oval.end.x)}px`,
                }}
              >
                <ellipse
                  cx={radiusX}
                  cy={radiusY}
                  rx={radiusX}
                  ry={radiusY}
                  style={{ stroke: oval.color, strokeWidth: "4", fill: "none" }}
                />
              </svg>
            );
          })}

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
