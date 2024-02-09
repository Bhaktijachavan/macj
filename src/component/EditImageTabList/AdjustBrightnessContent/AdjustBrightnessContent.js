import React, { useState, useRef } from "react";
import "./AdjustBrightnessContent.css";
import Buttons from "./../../Photo/Buttons";

const AdjustBrightnessContent = ({ imageUrl, texts }) => {
  const [brightness, setBrightness] = useState(100);
  const brightnessHistory = useRef([brightness]);
  const historyIndex = useRef(0);

  const handleBrightnessChange = (event) => {
    const newBrightness = event.target.value;
    setBrightness(newBrightness);
    // Add new brightness value to history
    brightnessHistory.current.push(newBrightness);
    // Move history index to the end
    historyIndex.current = brightnessHistory.current.length - 1;
  };

  const handleUndo = () => {
    if (historyIndex.current > 0) {
      historyIndex.current -= 1;
      const previousBrightness =
        brightnessHistory.current[historyIndex.current];
      setBrightness(previousBrightness);
    }
  };

  const handleRedo = () => {
    if (historyIndex.current < brightnessHistory.current.length - 1) {
      historyIndex.current += 1;
      const nextBrightness = brightnessHistory.current[historyIndex.current];
      setBrightness(nextBrightness);
    }
  };

  return (
    <div className="adjust-brightness-container">
      <div
        className="image-container-adjust-brightness"
        style={{ filter: `brightness(${brightness}%)` }}
      >
        <img
          src={imageUrl}
          alt="Preview"
          className="preview-image-brightness"
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
      </div>
      <div className="brightness-control">
        <label htmlFor="brightnessRange">Adjust Brightness</label>
        <input
          type="range"
          id="brightnessRange"
          min="0"
          max="200"
          value={brightness}
          onChange={handleBrightnessChange}
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

export default AdjustBrightnessContent;
