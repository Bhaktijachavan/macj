import React, { useState, useRef, useEffect } from "react";
import "./DrawLineContent.css";
import PropTypes from "prop-types";

const DrawLineContent = ({
  imageUrl,
  texts,
  drawnArrows,
  brightness,
  contrast,
  onDrawLines,
  drawnLines,
}) => {
  const [lines, setLines] = useState(drawnLines);
  const [drawing, setDrawing] = useState(false);
  const canvasRef = useRef(null);
  const linesHistory = useRef([]);
  const historyIndex = useRef(-1);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Draw the image on the canvas
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      // Calculate the aspect ratio of the image
      const aspectRatio = image.width / image.height;

      // Set the canvas width and height based on the image dimensions
      const maxWidth = 750; // Max width for the canvas
      const maxHeight = 600; // Max height for the canvas
      let canvasWidth = image.width;
      let canvasHeight = image.height;

      if (canvasWidth > maxWidth) {
        canvasWidth = maxWidth;
        canvasHeight = canvasWidth / aspectRatio;
      }

      if (canvasHeight > maxHeight) {
        canvasHeight = maxHeight;
        canvasWidth = canvasHeight * aspectRatio;
      }

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
      canvas.style.filter = `brightness(${brightness}%) contrast(${contrast}%)`;

      // Draw existing lines
      lines.forEach((line) => {
        drawLine(ctx, line.start, line.end, line.color);
      });
    };
  }, [imageUrl, lines, brightness, contrast]);

  const startDrawing = (e) => {
    e.preventDefault(); // Prevent default dragging behavior
    setDrawing(true);
    const { offsetX, offsetY } = e.nativeEvent;
    const newLine = {
      start: { x: offsetX, y: offsetY },
      end: { x: offsetX, y: offsetY },
      color: "blue",
    };
    setLines((prevLines) => [...prevLines, newLine]);
    // Add new line to history
    linesHistory.current.splice(historyIndex.current + 1);
    linesHistory.current.push([...lines]);
    historyIndex.current++;
  };

  const draw = (e) => {
    if (!drawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    setLines((prevLines) => {
      const updatedLines = [...prevLines];
      const lastIndex = updatedLines.length - 1;
      updatedLines[lastIndex].end = { x: offsetX, y: offsetY };
      return updatedLines;
    });
  };

  const stopDrawing = () => {
    setDrawing(false);
    onDrawLines(lines);
  };

  const drawLine = (context, start, end, color) => {
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.strokeStyle = color;
    context.lineWidth = 3;
    context.stroke();
    context.closePath();
  };

  const undo = () => {
    if (historyIndex.current > 0) {
      historyIndex.current--;
      setLines(linesHistory.current[historyIndex.current]);
    }
  };

  const redo = () => {
    if (historyIndex.current < linesHistory.current.length - 1) {
      historyIndex.current++;
      setLines(linesHistory.current[historyIndex.current]);
    }
  };

  return (
    <>
      <div className="container-for-draw-line-content-component">
        <div className="draw-line-container">
          <canvas
            className="canvas-for-draw-line-content"
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
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
        </div>
        <div className="Buttons-undo-redo-container">
          <button className="Buttons-undo-redo-yytytyt" onClick={undo}>
            Undo
          </button>
          <button className="Buttons-undo-redo-yytytyt" onClick={redo}>
            Redo
          </button>
        </div>
      </div>
    </>
  );
};

DrawLineContent.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  drawnLines: PropTypes.array.isRequired,
  onDrawLines: PropTypes.func.isRequired,
};

export default DrawLineContent;
