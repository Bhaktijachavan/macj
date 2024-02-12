import React, { useState, useRef, useEffect } from "react";
import "./DrawArrowContent.css";
import PropTypes from "prop-types";

const DrawArrowContent = ({
  imageUrl,
  texts,
  onDrawArrow,
  drawnArrows,
  brightness,
  contrast,
  drawnLines,
}) => {
  const [arrows, setArrows] = useState(drawnArrows); // Initialize state with drawnArrows
  const [drawing, setDrawing] = useState(false);
  const arrowRef = useRef(null);
  const arrowsHistory = useRef([]);
  const historyIndex = useRef(-1);

  useEffect(() => {
    const arrowCanvas = arrowRef.current;
    const ctx = arrowCanvas.getContext("2d");

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

      arrowCanvas.width = canvasWidth;
      arrowCanvas.height = canvasHeight;

      ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
      arrowCanvas.style.filter = `brightness(${brightness}%) contrast(${contrast}%)`;

      arrows.forEach((arrow) => {
        drawArrow(ctx, arrow.start, arrow.end, arrow.color);
      });
    };
  }, [imageUrl, arrows, brightness, contrast]);

  const startDrawing = (e) => {
    e.preventDefault();
    setDrawing(true);
    const { offsetX, offsetY } = e.nativeEvent;
    const newArrow = {
      start: { x: offsetX, y: offsetY },
      end: { x: offsetX, y: offsetY },
      color: "black",
    };
    setArrows((prevArrows) => [...prevArrows, newArrow]);
    // Add new arrow to history
    arrowsHistory.current.splice(historyIndex.current + 1);
    arrowsHistory.current.push([...arrows]);
    historyIndex.current++;
  };

  const draw = (e) => {
    if (!drawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    setArrows((prevArrows) => {
      const updatedArrows = [...prevArrows];
      const lastIndex = updatedArrows.length - 1;
      updatedArrows[lastIndex].end = { x: offsetX, y: offsetY };
      return updatedArrows;
    });
  };

  const stopDrawing = () => {
    setDrawing(false);
    // Pass the drawn arrows to the parent component
    onDrawArrow(arrows);
  };

  const drawArrow = (context, start, end, color) => {
    const headSize = 7;
    const angle = Math.atan2(end.y - start.y, end.x - start.x);

    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);

    // Draw arrowhead
    context.lineTo(
      end.x - headSize * Math.cos(angle - Math.PI / 6),
      end.y - headSize * Math.sin(angle - Math.PI / 6)
    );

    context.moveTo(end.x, end.y);
    context.lineTo(
      end.x - headSize * Math.cos(angle + Math.PI / 6),
      end.y - headSize * Math.sin(angle + Math.PI / 6)
    );

    context.strokeStyle = color;
    context.lineWidth = 4;
    context.stroke();
    context.closePath();
  };

  const undo = () => {
    if (historyIndex.current > 0) {
      historyIndex.current--;
      setArrows(arrowsHistory.current[historyIndex.current]);
    }
  };

  const redo = () => {
    if (historyIndex.current < arrowsHistory.current.length - 1) {
      historyIndex.current++;
      setArrows(arrowsHistory.current[historyIndex.current]);
    }
  };

  return (
    <div className="draw-arrow-container">
      <canvas
        className="canvas-for-draw-arrow-content"
        ref={arrowRef}
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

      <div className="Buttons-undo-redo-container">
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

DrawArrowContent.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onDrawArrow: PropTypes.func.isRequired,
  brightness: PropTypes.number.isRequired,
  contrast: PropTypes.number.isRequired,
  drawnArrows: PropTypes.array.isRequired, // Add prop type for drawn arrows
};

export default DrawArrowContent;
