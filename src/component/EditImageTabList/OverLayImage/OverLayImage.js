import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import "./OverLayImage.css";
import Draggable from "react-draggable";

const OverLayImage = forwardRef(
  (
    {
      imageUrl,
      textsWithPositions,
      drawnArrows,
      brightness,
      contrast,
      drawnLines,
      drawnOvals,
      drawnRectangles,
      croppedImageUrl,
      rotationAngle,
      onDownloadUrlChange,
    },
    ref
  ) => {
    const [isPopupOpen, setIsPopupOpen] = useState(true);
    const [overLay, setOverLay] = useState();
    const [uploadedPhoto, setUploadedPhoto] = useState(null);
    const fileInputRef = useRef(null);
    const [rotationAngles, setRotationAngle] = useState(0);
    const [imageSrc, setImageSrc] = useState("");
    const [isOkClicked, setIsOkClicked] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [combinedImageUrl, setCombinedImageUrl] = useState(null);

    // Function to load overLayImage from localStorage

    useEffect(() => {
      const handleKeydown = (event) => {
        if (event.ctrlKey && event.key === "z") {
          handleUndo();
        } else if (event.ctrlKey && event.key === "y") {
          handleRedo();
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

    const handleClosePopup = () => {
      setIsPopupOpen(false);
    };

    const handleOkButton = () => {
      setIsPopupOpen(false);
      if (uploadedPhoto) {
        // Set combined image URL to trigger download
        setCombinedImageUrl(uploadedPhoto);
      }
      setIsOkClicked(true);
    };

    const handleSelectButtonClick = () => {
      fileInputRef.current.click();
    };

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUploadedPhoto(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleRotateClockwise = () => {
      const newRotationAngle = (rotationAngles + 90) % 360;
      setRotationAngle(newRotationAngle);
    };

    const handleUndo = () => {
      // Handle undo logic
    };

    const handleRedo = () => {
      // Handle redo logic
    };

    const handleDownload = () => {
      const offScreenCanvas = document.createElement("canvas");
      const offScreenContext = offScreenCanvas.getContext("2d");

      const maxWidth = 776;
      const maxHeight = 576;

      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        const scaleFactor = Math.min(
          maxWidth / img.width,
          maxHeight / img.height
        );
        const scaledWidth = img.width * scaleFactor;
        const scaledHeight = img.height * scaleFactor;
        const rotatedWidth = Math.abs(
          scaledWidth * Math.cos((rotationAngle * Math.PI) / 180) +
            scaledHeight * Math.sin((rotationAngle * Math.PI) / 180)
        );
        const rotatedHeight = Math.abs(
          scaledWidth * Math.sin((rotationAngle * Math.PI) / 180) +
            scaledHeight * Math.cos((rotationAngle * Math.PI) / 180)
        );

        offScreenCanvas.width = rotatedWidth;
        offScreenCanvas.height = rotatedHeight;
        offScreenContext.filter = `contrast(${contrast}%) brightness(${brightness}%)`;
        offScreenContext.translate(rotatedWidth / 2, rotatedHeight / 2);
        offScreenContext.rotate((rotationAngle * Math.PI) / 180);
        offScreenContext.translate(-rotatedWidth / 2, -rotatedHeight / 2);

        offScreenContext.drawImage(img, 0, 0, scaledWidth, scaledHeight);

        if (uploadedPhoto) {
          const overlayImg = new Image();
          overlayImg.src = uploadedPhoto;
          overlayImg.onload = () => {
            offScreenContext.drawImage(overlayImg, position.x, position.y);

            drawOverlayElements(offScreenContext, scaleFactor);
            const combinedImageUrl = offScreenCanvas.toDataURL("image/jpeg");
            console.log("Combined Image URL:", combinedImageUrl);
            if (onDownloadUrlChange) {
              onDownloadUrlChange(combinedImageUrl);
            }
          };
        } else {
          drawOverlayElements(offScreenContext, scaleFactor);
          const imageUrl = offScreenCanvas.toDataURL("image/jpeg");
          console.log("Original Image URL:", imageUrl);
          if (onDownloadUrlChange) {
            onDownloadUrlChange(imageUrl);
          }
        }
      };
    };

    const drawOverlayElements = (context, scaleFactor) => {
      // Draw text overlays
      textsWithPositions.forEach((text) => {
        // Set up font style
        let fontStyle = "";
        if (text.isBold) fontStyle += "bold ";
        if (text.isItalic) fontStyle += "italic ";
        const font = `${fontStyle}${text.fontSize}px ${text.font}`;

        // Set up text alignment
        const textAlign = "left";

        // Set up text baseline
        const textBaseline = "top";

        // Set up text color
        const textColor = text.textColor;

        // Set up background color (highlight color)
        const backgroundColor = text.isHighlighted
          ? `${text.highlightColor}${Math.round(
              text.highlightOpacity * 255
            ).toString(16)}`
          : "transparent";

        // Set up text position
        const x = text.position.x;
        const y = text.position.y;

        // Set up text content
        const content = text.content;

        // Measure the width of the text
        const textWidth = context.measureText(content).width;

        // Draw transparent highlight rectangle separately
        // Draw transparent highlight rectangle separately
        // Draw transparent highlight rectangle separately
        // Draw transparent highlight rectangle separately
        if (text.isHighlighted) {
          context.fillStyle = backgroundColor;
          const highlightWidth = 2 * textWidth; // Calculate the width of the highlight rectangle
          const highlightX = x; // Start the highlight from the left side of the text
          context.fillRect(highlightX, y, highlightWidth, text.fontSize); // Use calculated width and original y position
        }

        // Draw text on canvas
        context.fillStyle = textColor;
        context.font = font;
        context.textAlign = textAlign;
        context.textBaseline = textBaseline;
        context.fillText(content, x, y);
      });

      // Draw arrows
      drawnArrows.forEach((arrow) => {
        // Calculate arrow length and angle
        const dx = arrow.end.x - arrow.start.x;
        const dy = arrow.end.y - arrow.start.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);

        // Calculate arrowhead positions relative to the arrow line
        const arrowheadLength = 15;
        const arrowheadX1 =
          arrow.end.x - arrowheadLength * Math.cos(angle - Math.PI / 6);
        const arrowheadY1 =
          arrow.end.y - arrowheadLength * Math.sin(angle - Math.PI / 6);
        const arrowheadX2 =
          arrow.end.x - arrowheadLength * Math.cos(angle + Math.PI / 6);
        const arrowheadY2 =
          arrow.end.y - arrowheadLength * Math.sin(angle + Math.PI / 6);

        // Draw arrow line
        context.strokeStyle = arrow.color;
        context.lineWidth = 4;
        context.beginPath();
        context.moveTo(arrow.start.x, arrow.start.y);
        context.lineTo(arrow.end.x, arrow.end.y);
        context.stroke();

        // Draw arrowhead
        context.beginPath();
        context.moveTo(arrowheadX1, arrowheadY1);
        context.lineTo(arrow.end.x, arrow.end.y);
        context.lineTo(arrowheadX2, arrowheadY2);
        context.closePath();
        context.fillStyle = arrow.color;
        context.fill();
      });

      drawnLines.forEach((line) => {
        // Calculate line length and angle
        const length = Math.sqrt(
          (line.end.x - line.start.x) ** 2 + (line.end.y - line.start.y) ** 2
        );
        const angle = Math.atan2(
          line.end.y - line.start.y,
          line.end.x - line.start.x
        );

        // Draw line
        context.strokeStyle = line.color;
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(line.start.x, line.start.y); // Start position
        context.lineTo(line.end.x, line.end.y); // End position
        context.stroke();
      });

      drawnRectangles.forEach((rectangle) => {
        // Calculate width and height of the rectangle
        const width = rectangle.end.x - rectangle.start.x;
        const height = rectangle.end.y - rectangle.start.y;

        // Draw the rectangle
        context.strokeStyle = rectangle.color;
        context.lineWidth = 2;
        context.beginPath();
        context.rect(rectangle.start.x, rectangle.start.y, width, height);
        context.stroke();
      });

      {
        drawnOvals.forEach((oval, index) => {
          // Calculate properties of the oval
          const width = Math.abs(oval.end.x - oval.start.x);
          const height = Math.abs(oval.end.y - oval.start.y);
          const centerX = oval.start.x + width / 2;
          const centerY = oval.start.y + height / 2;

          // Draw oval
          context.strokeStyle = oval.color;
          context.lineWidth = 2;
          context.beginPath();
          context.ellipse(
            centerX,
            centerY,
            width / 2,
            height / 2,
            0,
            0,
            2 * Math.PI
          );
          context.stroke();
        });
      }
    };

    useImperativeHandle(ref, () => ({
      handleDownload: handleDownload,
    }));

    return (
      <>
        <div className="Overlay-Image-container-to-overlay-image-super-container">
          <div
            className="Overlay-Image-container-to-overlay-image-container"
            style={{
              filter: `contrast(${contrast}%) brightness(${brightness}%) `,
              transform: `rotate(${rotationAngle}deg)`,
            }}
          >
            <img
              src={imageSrc}
              alt="Original Image"
              className="Overlay-Image-image-uploded"
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
                  pointerEvents: "none",
                }}
              >
                {text.content}
              </div>
            ))}
            {drawnLines.map((line, index) => (
              <div
                key={index}
                className="line-overlay"
                style={{
                  position: "absolute",
                  top: `${line.start.y}px`,
                  left: `${line.start.x}px`,
                  width: `${Math.sqrt(
                    (line.end.x - line.start.x) ** 2 +
                      (line.end.y - line.start.y) ** 2
                  )}px`,
                  height: "2px",
                  transformOrigin: "top left",
                  transform: `rotate(${Math.atan2(
                    line.end.y - line.start.y,
                    line.end.x - line.start.x
                  )}rad)`,
                  backgroundColor: line.color,
                  pointerEvents: "none",
                }}
              />
            ))}
            {drawnRectangles.map((rectangle, index) => (
              <div
                key={index}
                className="rectangle-overlay"
                style={{
                  position: "absolute",
                  top: `${rectangle.start.y}px`,
                  left: `${rectangle.start.x}px`,
                  width: `${rectangle.end.x - rectangle.start.x}px`,
                  height: `${rectangle.end.y - rectangle.start.y}px`,
                  border: `2px solid ${rectangle.color}`,
                  pointerEvents: "none",
                }}
              />
            ))}
            {drawnOvals.map((oval, index) => (
              <div
                key={index}
                className="oval-overlay"
                style={{
                  position: "absolute",
                  top: `${Math.min(oval.start.y, oval.end.y)}px`,
                  left: `${Math.min(oval.start.x, oval.end.x)}px`,
                  width: `${Math.abs(oval.end.x - oval.start.x)}px`,
                  height: `${Math.abs(oval.end.y - oval.start.y)}px`,
                  border: `2px solid ${oval.color}`,
                  borderRadius: "50%",
                  pointerEvents: "none",
                }}
              />
            ))}
            {drawnArrows.map((arrow, index) => {
              const angle = Math.atan2(
                arrow.end.y - arrow.start.y,
                arrow.end.x - arrow.start.x
              );
              const arrowheadLength = 15;
              const arrowheadX1 =
                arrow.end.x - arrowheadLength * Math.cos(angle - Math.PI / 6);
              const arrowheadY1 =
                arrow.end.y - arrowheadLength * Math.sin(angle - Math.PI / 6);
              const arrowheadX2 =
                arrow.end.x + arrowheadLength * Math.cos(angle + Math.PI / 6);
              const arrowheadY2 =
                arrow.end.y + arrowheadLength * Math.sin(angle + Math.PI / 6);
              return (
                <div key={index}>
                  <svg
                    width="100%"
                    height="100%"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      pointerEvents: "none",
                    }}
                  >
                    <line
                      x1={arrow.start.x}
                      y1={arrow.start.y}
                      x2={arrow.end.x}
                      y2={arrow.end.y}
                      style={{ stroke: arrow.color, strokeWidth: 4 }}
                    />
                    <polygon
                      points={`${arrowheadX1},${arrowheadY1} ${arrow.end.x},${arrow.end.y} ${arrowheadX2},${arrowheadY2}`}
                      style={{ fill: arrow.color }}
                    />
                  </svg>
                </div>
              );
            })}
            {isOkClicked && uploadedPhoto && (
              <Draggable
                defaultPosition={{ x: position.x, y: position.y }}
                onStop={(e, data) => setPosition({ x: data.x, y: data.y })}
              >
                <img
                  src={uploadedPhoto}
                  alt="Uploaded"
                  className="Overlay-Image-overlay"
                  style={{
                    transform: `rotate(${rotationAngles}deg)`,
                    position: "absolute",
                  }}
                />
              </Draggable>
            )}
          </div>
          {isPopupOpen && (
            <div className="Overlay-for-edit-images-tablist-section-main-container ">
              <div className=" Overlay-for-edit-images-tablist-section-header-container">
                <div>
                  <p>Crop Image</p>
                </div>
                <div onClick={handleClosePopup}>
                  <button className="OverlayImage-close-image-x">X</button>
                </div>
              </div>
              <div className="paracontainer-para">
                Click on move mouse to mark area.Click again to crop.Press Ok to
                insert Image
              </div>
              <div className="button-continer-rotate-super-container">
                <div className="Rotate-Button-to-rotate-Overlay-image-container">
                  <button
                    className="Rotate-Button-to-rotate-Overlay-image"
                    onClick={handleSelectButtonClick}
                  >
                    Select
                  </button>
                  <button
                    className="Rotate-Button-to-rotate-Overlay-image"
                    onClick={handleRotateClockwise}
                  >
                    Rotate
                  </button>
                </div>
                <div className="photo-container-photo-is-reviewed">
                  {uploadedPhoto && (
                    <img
                      src={uploadedPhoto}
                      alt="Uploaded"
                      style={{ transform: `rotate(${rotationAngles}deg)` }}
                    />
                  )}
                </div>
              </div>
              <div className="Buttons-to-add-overlay-image-ok-cancel-button">
                <div
                  className="ok-cancel-button-overlay-image"
                  onClick={handleOkButton}
                >
                  <button>Ok</button>
                </div>
                <div
                  className="ok-cancel-button-overlay-image"
                  onClick={handleClosePopup}
                >
                  <button>Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="Buttons-undo-redo-conatainer">
          <button className="Buttons-undo-redo-yytytyt" onClick={handleUndo}>
            Undo
          </button>
          <button className="Buttons-undo-redo-yytytyt" onClick={handleRedo}>
            Redo
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
      </>
    );
  }
);

export default OverLayImage;
