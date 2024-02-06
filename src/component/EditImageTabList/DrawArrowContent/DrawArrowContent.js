import React, { useState, useRef, useEffect } from "react";
import "./DrawArrowContent.css";
import PropTypes from "prop-types";

const DrawArrowContent = ({ imageUrl, texts }) => {
  const [arrows, setArrows] = useState([]);
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
      arrowCanvas.width = image.width;
      arrowCanvas.height = image.height;
      ctx.drawImage(image, 0, 0, image.width, image.height);

      arrows.forEach((arrow) => {
        drawArrow(ctx, arrow.start, arrow.end, arrow.color);
      });
    };
  }, [imageUrl, arrows]);

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
  };

  const drawArrow = (context, start, end, color) => {
    const headSize = 10;
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
    context.lineWidth = 8;
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
};

export default DrawArrowContent;
