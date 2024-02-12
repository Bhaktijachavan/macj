import React, { useRef } from "react";
import "./AdjustBrightnessContent.css";
import Buttons from "./../../Photo/Buttons";

const AdjustBrightnessContent = ({
  imageUrl,
  texts,
  brightness,
  onBrightnessChange,
  contrast,
  drawnArrows,
  drawnLines,
}) => {
  const brightnessHistory = useRef([brightness]);
  const historyIndex = useRef(0);

  const handleBrightnessChange = (event) => {
    const newBrightness = event.target.value;
    onBrightnessChange(newBrightness);
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
      onBrightnessChange(previousBrightness);
    }
  };

  const handleRedo = () => {
    if (historyIndex.current < brightnessHistory.current.length - 1) {
      historyIndex.current += 1;
      const nextBrightness = brightnessHistory.current[historyIndex.current];
      onBrightnessChange(nextBrightness);
    }
  };

  return (
    <div className="adjust-brightness-container">
      <div
        className="image-container-adjust-brightness"
        style={{
          filter: `brightness(${brightness}%) contrast(${contrast}%) `,
        }}
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
