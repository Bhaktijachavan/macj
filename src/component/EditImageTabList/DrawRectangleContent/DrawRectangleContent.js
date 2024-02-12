import React, { useState, useRef, useEffect } from "react";
import "./DrawRectangleContent.css";
import PropTypes from "prop-types";

const DrawRectangleContent = ({
  imageUrl,
  lineWidth = 2,
  texts,
  drawnArrows,
  brightness,
  contrast,
  drawnLines,
}) => {
  const [rectangles, setRectangles] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const rectangleRef = useRef(null);
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const rectangleCanvas = rectangleRef.current;
    const ctx = rectangleCanvas.getContext("2d");

    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      const aspectRatio = image.width / image.height;

      const maxWidth = 750;
      const maxHeight = 600;
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

      rectangleCanvas.width = canvasWidth;
      rectangleCanvas.height = canvasHeight;

      ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
      rectangleCanvas.style.filter = `brightness(${brightness}%) contrast(${contrast}%)`;

      rectangles.forEach((rectangle) => {
        drawRectangle(
          ctx,
          rectangle.start,
          rectangle.end,
          rectangle.color,
          lineWidth
        );
      });
    };
  }, [imageUrl, rectangles, lineWidth, brightness, contrast]);

  const startDrawing = (e) => {
    e.preventDefault();
    setDrawing(true);
    const { offsetX, offsetY } = e.nativeEvent;
    setRectanglesWithHistory([
      ...rectangles,
      {
        start: { x: offsetX, y: offsetY },
        end: { x: offsetX, y: offsetY },
        color: "black",
      },
    ]);
  };

  const draw = (e) => {
    if (!drawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    setRectangles((prevRectangles) => {
      const updatedRectangles = [...prevRectangles];
      const lastIndex = updatedRectangles.length - 1;
      updatedRectangles[lastIndex].end = { x: offsetX, y: offsetY };
      return updatedRectangles;
    });
  };

  const stopDrawing = () => {
    setDrawing(false);
  };

  const drawRectangle = (context, start, end, color, width) => {
    context.beginPath();
    context.rect(start.x, start.y, end.x - start.x, end.y - start.y);
    context.strokeStyle = color;
    context.lineWidth = width;
    context.stroke();
    context.closePath();
  };

  const pushToHistory = (rectangles) => {
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(rectangles);
    setHistory(newHistory);
    setCurrentIndex(currentIndex + 1);
  };

  const setRectanglesWithHistory = (newRectangles) => {
    setRectangles(newRectangles);
    pushToHistory(newRectangles);
  };

  const undo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setRectangles(history[currentIndex - 1]);
    }
  };

  const redo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setRectangles(history[currentIndex + 1]);
    }
  };

  return (
    <div className="draw-rectangle-container">
      <canvas
        className="canvas-for-draw-rectangle-content"
        ref={rectangleRef}
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

DrawRectangleContent.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  lineWidth: PropTypes.number,
};

export default DrawRectangleContent;
