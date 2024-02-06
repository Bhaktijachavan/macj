import React, { useState, useRef } from "react";
import "./RotateClockwiseContent.css";
import PropTypes from "prop-types";

const RotateClockwiseContent = ({ imageUrl, texts }) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const rotationHistory = useRef([rotationAngle]);
  const historyIndex = useRef(0);

  const handleRotateClockwise = () => {
    const newRotationAngle = (rotationAngle + 90) % 360;
    setRotationAngle(newRotationAngle);
    // Add new rotation angle to history
    rotationHistory.current.push(newRotationAngle);
    // Move history index to the end
    historyIndex.current = rotationHistory.current.length - 1;
  };

  const handleUndo = () => {
    if (historyIndex.current > 0) {
      historyIndex.current -= 1;
      const previousRotationAngle =
        rotationHistory.current[historyIndex.current];
      setRotationAngle(previousRotationAngle);
    }
  };

  const handleRedo = () => {
    if (historyIndex.current < rotationHistory.current.length - 1) {
      historyIndex.current += 1;
      const nextRotationAngle = rotationHistory.current[historyIndex.current];
      setRotationAngle(nextRotationAngle);
    }
  };

  return (
    <>
      <div className="rotate-clockwise-container">
        <div
          className="image-container-rotate-clockwise-eee-rrrr"
          style={{ transform: `rotate(${rotationAngle}deg)` }}
        >
          <img src={imageUrl} alt="Preview" className="preview-image-rotate" />
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
        </div>
      </div>
      <div className="rotate-clockwise-control">
        <button
          onClick={handleRotateClockwise}
          className="rotate-clockwise-control-btn-rreeett"
        >
          Rotate Clockwise
        </button>
      </div>
      <div className="Buttons-undo-redo-conatainer">
        <button className="Buttons-undo-redo-yytytyt" onClick={handleUndo}>
          Undo
        </button>
        <button className="Buttons-undo-redo-yytytyt" onClick={handleRedo}>
          Redo
        </button>
      </div>
    </>
  );
};

RotateClockwiseContent.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default RotateClockwiseContent;
