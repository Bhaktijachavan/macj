import React, { useState, useRef, useEffect } from "react";
import "./DrawOvalContent.css";
import PropTypes from "prop-types";

const DrawOvalContent = ({
  imageUrl,
  lineWidth = 8,
  texts,
  drawnArrows,
  brightness,
  contrast,
  drawnLines,
  drawnOvals,
  onDrawOvals,
  drawnRectangles,
  croppedImageUrl,
}) => {
  const [ovals, setOvals] = useState(drawnOvals);
  const [drawing, setDrawing] = useState(false);
  const ovalRef = useRef(null);
  const ovalsHistory = useRef([]);
  const historyIndex = useRef(-1);
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

  useEffect(() => {
    const ovalCanvas = ovalRef.current;
    const ctx = ovalCanvas.getContext("2d");

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

      ovalCanvas.width = canvasWidth;
      ovalCanvas.height = canvasHeight;

      ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
      ovalCanvas.style.filter = `brightness(${brightness}%) contrast(${contrast}%)`;

      ovals.forEach((oval) => {
        drawOval(ctx, oval.start, oval.end, oval.color, lineWidth);
      });
    };
  }, [imageSrc, ovals, lineWidth, brightness, contrast]);

  const startDrawing = (e) => {
    e.preventDefault();
    setDrawing(true);
    const { offsetX, offsetY } = e.nativeEvent;
    const newOval = {
      start: { x: offsetX, y: offsetY },
      end: { x: offsetX, y: offsetY },
      color: "black",
    };
    setOvals((prevOvals) => [...prevOvals, newOval]);
    // Add new oval to history
    ovalsHistory.current.splice(historyIndex.current + 1);
    ovalsHistory.current.push([...ovals]);
    historyIndex.current++;
  };

  const draw = (e) => {
    if (!drawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    setOvals((prevOvals) => {
      const updatedOvals = [...prevOvals];
      const lastIndex = updatedOvals.length - 1;
      updatedOvals[lastIndex].end = { x: offsetX, y: offsetY };
      return updatedOvals;
    });
  };

  const stopDrawing = () => {
    setDrawing(false);
    onDrawOvals(ovals);
  };

  const drawOval = (context, start, end, color, width) => {
    context.beginPath();
    const radiusX = Math.abs(end.x - start.x) / 2;
    const radiusY = Math.abs(end.y - start.y) / 2;
    const centerX = Math.min(start.x, end.x) + radiusX;
    const centerY = Math.min(start.y, end.y) + radiusY;

    context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
    context.strokeStyle = color;
    context.lineWidth = 3;
    context.stroke();
    context.closePath();
  };

  const undo = () => {
    if (historyIndex.current > 0) {
      historyIndex.current--;
      setOvals(ovalsHistory.current[historyIndex.current]);
    }
  };

  const redo = () => {
    if (historyIndex.current < ovalsHistory.current.length - 1) {
      historyIndex.current++;
      setOvals(ovalsHistory.current[historyIndex.current]);
    }
  };

  return (
    <div className="draw-oval-main-container">
      <div className="draw-oval-container">
        <canvas
          className="canvas-for-draw-oval-content"
          ref={ovalRef}
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
      </div>

      <div className="Buttons-undo-redo-conatainer">
        <button className="Buttons-undo-redo-yytytyt" onClick={undo}>
          Undo
        </button>
        <button className="Buttons-undo-redo-yytytyt" onClick={redo}>
          Redo
        </button>
      </div>
    </div>
  );
};

DrawOvalContent.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  lineWidth: PropTypes.number,
  drawnOval: PropTypes.array.isRequired,
  onDrawOvals: PropTypes.func.isRequired,
};

export default DrawOvalContent;
