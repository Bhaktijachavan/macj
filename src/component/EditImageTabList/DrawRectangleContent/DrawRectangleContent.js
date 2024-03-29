import React, { useState, useRef, useEffect } from "react";
import "./DrawRectangleContent.css";
import PropTypes from "prop-types";

const DrawRectangleContent = ({
  imageUrl,
  lineWidth = 2,
  textsWithPositions,
  drawnArrows,
  brightness,
  contrast,
  drawnLines,
  drawnOvals,
  drawnRectangles,
  onDrawRectangles,
  croppedImageUrl,
  rotationAngle,
  arrowColor,
}) => {
  const [rectangles, setRectangles] = useState(drawnRectangles);
  const [drawing, setDrawing] = useState(false);
  const rectangleRef = useRef(null);
  const rectanglesHistory = useRef([drawnRectangles]);
  const historyIndex = useRef(0);
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

  // useEffect(() => {

  //   const rectangleCanvas = rectangleRef.current;
  //   const ctx = rectangleCanvas.getContext("2d");

  //   const image = new Image();
  //   image.src = imageSrc;
  //   image.onload = () => {
  //     const aspectRatio = image.width / image.height;

  //     const maxWidth = 776;
  //     const maxHeight = 576;
  //     let canvasWidth = image.width;
  //     let canvasHeight = image.height;

  //     if (canvasWidth > maxWidth) {
  //       canvasWidth = maxWidth;
  //       canvasHeight = canvasWidth / aspectRatio;
  //     }

  //     if (canvasHeight > maxHeight) {
  //       canvasHeight = maxHeight;
  //       canvasWidth = canvasHeight * aspectRatio;
  //     }

  //     rectangleCanvas.width = canvasWidth;
  //     rectangleCanvas.height = canvasHeight;

  //     ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);

  //     rectangles.forEach((rectangle) => {
  //       drawRectangle(
  //         ctx,
  //         rectangle.start,
  //         rectangle.end,
  //         rectangle.color,
  //         lineWidth
  //       );
  //     });
  //   };
  // }, [imageSrc, rectangles, lineWidth, brightness, contrast]);
  useEffect(() => {
    const rectangleCanvas = rectangleRef.current;
    const ctx = rectangleCanvas.getContext("2d");

    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const aspectRatio = image.width / image.height;

      const maxWidth = 776;
      const maxHeight = 576;
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

      rectangles.forEach((rectangle) => {
        drawRectangle(
          ctx,
          rectangle.start,
          rectangle.end,
          rectangle.color,
          lineWidth
        );
      });

      // Get URL of the canvas content
      // const canvasUrl = rectangleCanvas.toDataURL("image/jpeg");
      // console.log("Canvas URL:", canvasUrl);
    };
  }, [imageSrc, rectangles, lineWidth, brightness, contrast]);

  const startDrawing = (e) => {
    e.preventDefault();
    setDrawing(true);
    const { offsetX, offsetY } = e.nativeEvent;
    const newrectangel = {
      start: { x: offsetX, y: offsetY },
      end: { x: offsetX, y: offsetY },
      color: arrowColor,
    };
    rectanglesHistory.current.splice(historyIndex.current + 1);
    rectanglesHistory.current.push([...rectangles]);
    historyIndex.current++;
    setRectangles((prevRectangles) => [...prevRectangles, newrectangel]);
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
    rectanglesHistory.current[historyIndex.current] = [...rectangles];
  };

  const stopDrawing = () => {
    setDrawing(false);
    onDrawRectangles(rectangles);
  };

  const drawRectangle = (context, start, end, color, width) => {
    context.beginPath();
    context.rect(start.x, start.y, end.x - start.x, end.y - start.y);
    context.strokeStyle = color;
    context.lineWidth = width;
    context.stroke();
    context.closePath();
  };

  const undo = () => {
    if (historyIndex.current > 0) {
      historyIndex.current--;
      setRectangles(rectanglesHistory.current[historyIndex.current]);
    }
  };

  const redo = () => {
    if (historyIndex.current < rectanglesHistory.current.length - 1) {
      historyIndex.current++;
      setRectangles(rectanglesHistory.current[historyIndex.current]);
    }
  };

  return (
    <>
      <div className="draw-rectangle-main-container">
        <div
          className="draw-rectangle-container"
          style={{
            filter: `contrast(${contrast}%) brightness(${brightness}%) `,
            transform: `rotate(${rotationAngle}deg)`,
          }}
        >
          <canvas
            className="canvas-for-draw-rectangle-content"
            ref={rectangleRef}
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
                  pointerEvents: "none", // Allow pointer events to pass through
                }}
              >
                <line
                  x1={Math.abs(
                    line.start.x - Math.min(line.start.x, line.end.x)
                  )}
                  y1={Math.abs(
                    line.start.y - Math.min(line.start.y, line.end.y)
                  )}
                  x2={Math.abs(line.end.x - Math.min(line.start.x, line.end.x))}
                  y2={Math.abs(line.end.y - Math.min(line.start.y, line.end.y))}
                  style={{ stroke: line.color, strokeWidth: "4" }}
                />
              </svg>
            ))}
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
        </div>
      </div>
      <div className="Buttons-undo-redo-conatainer">
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

DrawRectangleContent.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  lineWidth: PropTypes.number,
  drawnRectangles: PropTypes.array.isRequired,
  onDrawRectangles: PropTypes.func.isRequired,
};

export default DrawRectangleContent;
