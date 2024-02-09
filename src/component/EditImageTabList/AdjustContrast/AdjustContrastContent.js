import React, { useState, useRef } from "react";
import "./AdjustContrastContent.css"; // Update the CSS file name
import PropTypes from "prop-types";

const AdjustContrastContent = ({ imageUrl, texts }) => {
  const [contrast, setContrast] = useState(100);
  const contrastHistory = useRef([contrast]);
  const historyIndex = useRef(0);

  const handleContrastChange = (event) => {
    const newContrast = event.target.value;
    setContrast(newContrast);
    // Add new contrast value to history
    contrastHistory.current.push(newContrast);
    // Move history index to the end
    historyIndex.current = contrastHistory.current.length - 1;
  };

  const handleUndo = () => {
    if (historyIndex.current > 0) {
      historyIndex.current -= 1;
      const previousContrast = contrastHistory.current[historyIndex.current];
      setContrast(previousContrast);
    }
  };

  const handleRedo = () => {
    if (historyIndex.current < contrastHistory.current.length - 1) {
      historyIndex.current += 1;
      const nextContrast = contrastHistory.current[historyIndex.current];
      setContrast(nextContrast);
    }
  };

  return (
    <div className="adjust-contrast-container">
      <div
        className="image-container-adjust-contrast"
        style={{ filter: `contrast(${contrast}%)` }}
      >
        <img src={imageUrl} alt="Preview" className="preview-image-contrast" />
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
      <div className="contrast-control">
        <label htmlFor="contrastRange">Adjust Contrast</label>
        <input
          type="range"
          id="contrastRange"
          min="0"
          max="200"
          value={contrast}
          onChange={handleContrastChange}
        />
      </div>
      <div className="Buttons-undo-redo-container">
        <button className="Buttons-undo-redo-yytytyt" onClick={handleUndo}>
          Undo
        </button>
        <button className="Buttons-undo-redo-yytytyt" onClick={handleRedo}>
          Redo
        </button>
      </div>
    </div>
  );
};

AdjustContrastContent.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default AdjustContrastContent;
