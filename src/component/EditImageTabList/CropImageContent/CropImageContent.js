import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./CropImageContent.css";

const CropImageContent = ({ imageUrl, texts }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [rectangles, setRectangles] = useState([]);
  const [croppedImage, setCroppedImage] = useState(null);
  const rectangleRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const image = new Image();
    image.src = imageUrl;

    image.onload = () => {
      const canvas = rectangleRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

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
    };
  }, [imageUrl, rectangles]);

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
    const width = e.nativeEvent.offsetX - rect.startX;
    const height = e.nativeEvent.offsetY - rect.startY;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
    ctx.fillRect(rect.startX, rect.startY, width, height);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(rect.startX, rect.startY, width, height);

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
      rect.startX,
      rect.startY,
      rect.width,
      rect.height
    );

    const croppedCanvas = document.createElement("canvas");
    const croppedCtx = croppedCanvas.getContext("2d");
    croppedCanvas.width = rect.width;
    croppedCanvas.height = rect.height;
    croppedCtx.putImageData(croppedImageData, 0, 0);

    setCroppedImage(croppedCanvas.toDataURL("image/jpeg"));
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
          width={800} // Adjust width as needed
          height={600} // Adjust height as needed
        />
        <img
          ref={imageRef}
          src={imageUrl}
          alt="Original Image"
          style={{ display: "none" }}
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
      <div className="Buttons-undo-redo-conatainer">
        <button className="Buttons-undo-redo-yytytyt" onClick={cropImage}>
          Crop Image
        </button>
      </div>
      {croppedImage && (
        <div className="cropped-image-container">
          <p>Cropped Image:</p>
          <img src={croppedImage} alt="Cropped Image" />
        </div>
      )}
    </div>
  );
};

CropImageContent.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default CropImageContent;
