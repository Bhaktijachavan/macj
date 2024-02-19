import React, { useState, useRef, useEffect } from "react";
import "./DrawLineContent.css";
import PropTypes from "prop-types";

const DrawLineContent = ({
  imageUrl,
  textsWithPositions,
  drawnArrows,
  brightness,
  contrast,
  onDrawLines,
  drawnLines,
  drawnOvals,
  drawnRectangles,
  croppedImageUrl,
  rotationAngle,
  arrowColor = { arrowColor },
}) => {
  const [lines, setLines] = useState(drawnLines);
  const [drawing, setDrawing] = useState(false);
  const canvasRef = useRef(null);
  const linesHistory = useRef([drawnLines]);
  const historyIndex = useRef(0);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    linesHistory.current.push(drawnLines); // Add the initial state to the history
  }, []); // Empty dependency array to run only once
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
  }, []);

  useEffect(() => {
    if (croppedImageUrl) {
      setImageSrc(croppedImageUrl);
    } else {
      setImageSrc(imageUrl); // Set to original image URL
    }
  }, [croppedImageUrl]);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Draw the image on the canvas
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      // Calculate the aspect ratio of the image
      const aspectRatio = image.width / image.height;

      // Set the canvas width and height based on the image dimensions
      const maxWidth = 776; // Max width for the canvas
      const maxHeight = 576; // Max height for the canvas
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

      // Draw existing lines
      lines.forEach((line) => {
        drawLine(ctx, line.start, line.end, line.color);
      });
    };
  }, [imageSrc, lines, brightness, contrast]);

  const startDrawing = (e) => {
    e.preventDefault(); // Prevent default dragging behavior
    setDrawing(true);
    const { offsetX, offsetY } = e.nativeEvent;
    const newLine = {
      start: { x: offsetX, y: offsetY },
      end: { x: offsetX, y: offsetY },
      color: arrowColor,
    };
    linesHistory.current.splice(historyIndex.current + 1);
    linesHistory.current.push([...lines]);
    historyIndex.current++;
    setLines((prevLines) => [...prevLines, newLine]);
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
    linesHistory.current[historyIndex.current] = [...lines];
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
        <div
          className="draw-line-container"
          style={{
            filter: `contrast(${contrast}%) brightness(${brightness}%) `,
            transform: `rotate(${rotationAngle}deg)`,
          }}
        >
          <canvas
            className="canvas-for-draw-line-content"
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
          />
          {textsWithPositions.map((text) => (
            <div
              key={text.id}
              className="text-overlay"
              style={{
                color: text.textColor,
                position: "absolute",
                top: `${text.position.y}px`,
                left: `${text.position.x}px`,
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
                pointerEvents: "none", // Disable pointer events so that clicks pass through the text overlay to the image
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
                    pointerEvents: "none", // Allow pointer events to pass through
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
                  viewBox={`0 0 ${Math.abs(
                    oval.end.x - oval.start.x
                  )} ${Math.abs(oval.end.y - oval.start.y)}`}
                  style={{
                    position: "absolute",
                    top: `${Math.min(oval.start.y, oval.end.y)}px`,
                    left: `${Math.min(oval.start.x, oval.end.x)}px`,
                    pointerEvents: "none", // Allow pointer events to pass through
                  }}
                >
                  <ellipse
                    cx={radiusX}
                    cy={radiusY}
                    rx={radiusX}
                    ry={radiusY}
                    style={{
                      stroke: oval.color,
                      strokeWidth: "4",
                      fill: "none",
                    }}
                  />
                </svg>
              );
            })}
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
                    pointerEvents: "none", // Allow pointer events to pass through
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
        </div>
      </div>
      <div className="Buttons-undo-redo-container">
        <button className="Buttons-undo-redo-yytytyt" onClick={undo}>
          Undo
        </button>
        <button className="Buttons-undo-redo-yytytyt" onClick={redo}>
          Redo
        </button>
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
