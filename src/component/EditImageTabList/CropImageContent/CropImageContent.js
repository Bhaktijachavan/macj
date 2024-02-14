import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./CropImageContent.css";

const CropImageContent = ({
  imageUrl,
  texts,
  drawnArrows,
  brightness,
  contrast,
  drawnLines,
  drawnOvals,
  drawnRectangles,
  onCrop,
  croppedImageUrl,
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [rectangles, setRectangles] = useState([]);
  // const [croppedImage, setCroppedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(croppedImageUrl);
  const [isCropped, setIsCropped] = useState(false); // Track whether image is cropped or not
  const [prevCanvasState, setPrevCanvasState] = useState(null); // Store previous canvas state
  const [nextCanvasState, setNextCanvasState] = useState(null); // Store next canvas state
  const rectangleRef = useRef(null);
  const imageRef = useRef(null);
  const canvasWidth = 700;
  const canvasHeight = 570;

  useEffect(() => {
    const image = new Image();
    image.src = imageUrl;

    image.onload = () => {
      const canvas = rectangleRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`; // Add brightness and contrast filters
      ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);

      rectangles.forEach((rect) => {
        if (rect.isSelecting) {
          ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
          ctx.fillRect(rect.startX, rect.startY, rect.width, rect.height);
        } else {
          ctx.clearRect(rect.startX, rect.startY, rect.width, rect.height);
          ctx.drawImage(
            image,
            rect.startX,
            rect.startY,
            rect.width,
            rect.height,
            rect.startX,
            rect.startY,
            rect.width,
            rect.height
          );
        }
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeRect(rect.startX, rect.startY, rect.width, rect.height);
      });

      // Clear canvas and redraw cropped image if it exists
      if (croppedImage) {
        const croppedImg = new Image();
        croppedImg.src = croppedImage;
        croppedImg.onload = () => {
          ctx.clearRect(0, 0, canvasWidth, canvasHeight);
          ctx.drawImage(croppedImg, 0, 0);
        };
        // if (croppedImageUrl) {
        //   setCroppedImage(croppedImageUrl);
        // } else {
        //   setCroppedImage(imageUrl); // Set to original image URL
        // }
      }
    };
  }, [
    imageUrl,
    rectangles,
    brightness,
    contrast,
    croppedImage,
    canvasWidth,
    canvasHeight,
  ]);

  const handleMouseDown = (e) => {
    const startX = e.nativeEvent.offsetX;
    const startY = e.nativeEvent.offsetY;

    setIsDrawing(true);
    setRectangles([{ startX, startY, width: 0, height: 0, isSelecting: true }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const canvas = rectangleRef.current;
    const ctx = canvas.getContext("2d");
    const rect = rectangles[0];
    const currentX = e.nativeEvent.offsetX;
    const currentY = e.nativeEvent.offsetY;

    // Calculate width and height based on current mouse position
    const width = currentX - rect.startX;
    const height = currentY - rect.startY;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imageRef.current, 0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
    ctx.fillRect(
      Math.min(rect.startX, currentX),
      Math.min(rect.startY, currentY),
      Math.abs(width),
      Math.abs(height)
    );
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(
      Math.min(rect.startX, currentX),
      Math.min(rect.startY, currentY),
      Math.abs(width),
      Math.abs(height)
    );

    setRectangles([
      {
        startX: rect.startX,
        startY: rect.startY,
        width,
        height,
        isSelecting: true,
      },
    ]);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    const rect = rectangles[0];
    setRectangles([{ ...rect, isSelecting: false }]);
  };

  const handleMouseOut = () => {
    setIsDrawing(false);
    const rect = rectangles[0];
    setRectangles([{ ...rect, isSelecting: false }]);
  };

  const cropImage = () => {
    const rect = rectangles[0];

    const canvas = rectangleRef.current;
    const ctx = canvas.getContext("2d");
    const croppedImageData = ctx.getImageData(
      Math.min(rect.startX, rect.startX + rect.width),
      Math.min(rect.startY, rect.startY + rect.height),
      Math.abs(rect.width),
      Math.abs(rect.height)
    );
    const croppedCanvas = document.createElement("canvas");
    const croppedCtx = croppedCanvas.getContext("2d");
    croppedCanvas.width = Math.abs(rect.width);
    croppedCanvas.height = Math.abs(rect.height);
    croppedCtx.putImageData(croppedImageData, 0, 0);

    // Save previous canvas state before cropping
    setPrevCanvasState(ctx.getImageData(0, 0, canvasWidth, canvasHeight));

    onCrop(croppedCanvas.toDataURL("image/jpeg"));
    setIsCropped(true); // Set the cropped flag to true
    setNextCanvasState(croppedImageData); // Store the next canvas state for redo
    // onCrop(croppedCanvas.toDataURL("image/jpeg"));
  };

  const handleUndo = () => {
    // Restore previous canvas state
    const canvas = rectangleRef.current;
    const ctx = canvas.getContext("2d");
    ctx.putImageData(prevCanvasState, 0, 0);

    // Reset state
    setIsCropped(false);
    setCroppedImage(null);
    setNextCanvasState(ctx.getImageData(0, 0, canvasWidth, canvasHeight)); // Update next state for redo
  };

  const handleRedo = () => {
    // Restore next canvas state
    const canvas = rectangleRef.current;
    const ctx = canvas.getContext("2d");
    ctx.putImageData(nextCanvasState, 0, 0);

    // Reset state
    setIsCropped(true);
    setCroppedImage(canvas.toDataURL("image/jpeg"));
    setPrevCanvasState(ctx.getImageData(0, 0, canvasWidth, canvasHeight)); // Update previous state for undo
  };

  return (
    <div className="crop-image-container">
      <div className="image-container">
        <canvas
          ref={rectangleRef}
          className="original-image"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseOut={handleMouseOut}
          width={canvasWidth}
          height={canvasHeight}
          style={{ display: isCropped ? "none" : "block" }}
        />
        {/* {isCropped ? (
          <img
            // src={croppedImageUrl}
            // alt="Cropped Image"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        ) : ( */}
        <div className="image-container">
          <img
            ref={imageRef}
            src={imageUrl}
            // src={croppedImageUrl}
            alt="Original Image"
            style={{ display: "none" }}
          />
        </div>
        {/* )} */}
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
                viewBox={`0 0 ${Math.abs(oval.end.x - oval.start.x)} ${Math.abs(
                  oval.end.y - oval.start.y
                )}`}
                style={{
                  position: "absolute",
                  top: `${Math.min(oval.start.y, oval.end.y)}px`,
                  left: `${Math.min(oval.start.x, oval.end.x)}px`,
                }}
              >
                <ellipse
                  cx={radiusX}
                  cy={radiusY}
                  rx={radiusX}
                  ry={radiusY}
                  style={{ stroke: oval.color, strokeWidth: "4", fill: "none" }}
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
        {!isCropped && (
          <button className="Buttons-undo-redo-yytytyt" onClick={cropImage}>
            Crop Image
          </button>
        )}
      </div>
      {isCropped && (
        <div className="cropped-image-container">
          {/* <p>Cropped Image:</p> */}
          <img src={croppedImageUrl} alt="Cropped Image" />
        </div>
      )}

      <div className="Buttons-undo-redo-container-ir">
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

CropImageContent.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onCrop: PropTypes.func.isRequired,
  // croppedImageUrl: PropTypes.array.isRequired,
  croppedImageUrl: PropTypes.string,
};

export default CropImageContent;
