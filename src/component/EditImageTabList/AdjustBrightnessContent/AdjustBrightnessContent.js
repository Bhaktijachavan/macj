import React, { useState } from "react";
import "./AdjustBrightnessContent.css";

const AdjustBrightnessContent = ({ imageUrl, texts }) => {
  const [brightness, setBrightness] = useState(100);

  const handleBrightnessChange = (event) => {
    const newBrightness = event.target.value;
    setBrightness(newBrightness);
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
    </div>
  );
};

export default AdjustBrightnessContent;
