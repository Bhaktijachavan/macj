// import React, { useState, useRef, useEffect } from "react";
// import "./OverLayImage.css";
// import Draggable from "react-draggable";
// const OverLayImage = ({
//   imageUrl,
//   textsWithPositions,
//   drawnArrows,
//   brightness,
//   contrast,
//   drawnLines,
//   drawnOvals,
//   drawnRectangles,
//   croppedImageUrl,
//   overLayImage,
//   onOverlayChange,
//   rotationAngle,
// }) => {
//   const [isPopupOpen, setIsPopupOpen] = useState(true);
//   const [OverLay, setOverLay] = useState(overLayImage);

//   const [uploadedPhoto, setUploadedPhoto] = useState(null);
//   const fileInputRef = useRef(null);

//   const [rotationAngles, setRotationAngle] = useState(0);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [imageSrc, setImageSrc] = useState("");
//   const [isOkClicked, setIsOkClicked] = useState();
//   const [history, setHistory] = useState([]);
//   const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);

//   useEffect(() => {
//     const handleKeydown = (event) => {
//       if (event.ctrlKey && event.key === "z") {
//         handleUndo();
//       } else if (event.ctrlKey && event.key === "y") {
//         handleRedo();
//       }
//     };

//     window.addEventListener("keydown", handleKeydown);

//     return () => {
//       window.removeEventListener("keydown", handleKeydown);
//     };
//   }, []); // Empty dependency array to run only once

//   useEffect(() => {
//     if (croppedImageUrl) {
//       setImageSrc(croppedImageUrl);
//     } else {
//       setImageSrc(imageUrl); // Set to original image URL
//     }
//   }, [croppedImageUrl]);

//   const handleClosePopup = () => {
//     setIsPopupOpen(false);
//   };

//   const handleOkButton = () => {
//     setIsPopupOpen(false);
//     if (uploadedPhoto) {
//       // Combine the original image with the overlay
//       combineImages(imageUrl, uploadedPhoto)
//         .then((combinedImage) => {
//           // Pass the combined image to the parent component
//           onOverlayChange(combinedImage);
//           setOverLay(combinedImage); // Set the combined image as the overlay
//           setIsOkClicked(true);

//           downloadCombinedImage(combinedImage, "combined_image.jpg");
//         })
//         .catch((error) => {
//           console.error("Error combining images:", error);
//         });
//     }
//   };
//   // Function to combine images
//   const combineImages = (originalImageUrl, overlayImageUrl) => {
//     return new Promise((resolve, reject) => {
//       const originalImage = new Image();
//       const overlayImage = new Image();

//       originalImage.onload = () => {
//         overlayImage.onload = () => {
//           const canvas = document.createElement("canvas");
//           const context = canvas.getContext("2d");

//           // Set canvas dimensions to match original image
//           canvas.width = originalImage.width;
//           canvas.height = originalImage.height;

//           // Draw original image
//           context.drawImage(originalImage, 0, 0);
//           // Draw overlay image
//           context.drawImage(overlayImage, position.x, position.y);

//           // Get data URL of the combined image
//           const combinedImageUrl = canvas.toDataURL("image/jpeg");
//           resolve(combinedImageUrl);
//         };

//         overlayImage.onerror = reject;
//         overlayImage.src = overlayImageUrl;
//       };

//       originalImage.onerror = reject;
//       originalImage.src = originalImageUrl;
//     });
//   };

//   // Function to download the combined image
//   const downloadCombinedImage = (dataUrl, filename) => {
//     const anchor = document.createElement("a");
//     anchor.href = dataUrl;
//     anchor.download = filename;
//     anchor.click();
//   };

//   const handleSelectButtonClick = () => {
//     // Trigger the file input's click event when the "Select" button is clicked
//     fileInputRef.current.click();
//   };

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0]; // Get the first file from the selected files
//     if (file) {
//       const reader = new FileReader(); // Create a file reader object
//       reader.onloadend = () => {
//         // Callback function to handle when the file reading is completed
//         setUploadedPhoto(reader.result); // Set the uploaded photo as data URL
//       };
//       reader.readAsDataURL(file); // Read the file as a data URL
//     }
//   };

//   const handleRotateClockwise = () => {
//     const newRotationAngle = (rotationAngles + 90) % 360;
//     setRotationAngle(newRotationAngle);
//   };
//   const handleUndo = () => {
//     if (currentHistoryIndex > 0) {
//       setCurrentHistoryIndex(currentHistoryIndex - 1);
//       setOverLay(history[currentHistoryIndex - 1]);
//     }
//   };

//   const handleRedo = () => {
//     if (currentHistoryIndex < history.length - 1) {
//       setCurrentHistoryIndex(currentHistoryIndex + 1);
//       setOverLay(history[currentHistoryIndex + 1]);
//     }
//   };

//   return (
//     <>
//       <div className="Overlay-Image-container-to-overlay-image-super-container">
//         <div
//           className="Overlay-Image-container-to-overlay-image-container"
//           style={{
//             filter: `contrast(${contrast}%) brightness(${brightness}%) `,
//             transform: `rotate(${rotationAngle}deg)`,
//           }}
//         >
//           <img
//             src={imageSrc}
//             alt="Original Image"
//             className="Overlay-Image-image-uploded"
//           />
// {textsWithPositions.map((text) => (
//   <div
//     key={text.id}
//     className="text-overlay"
//     style={{
//       color: text.textColor,
//       position: "absolute",
//       top: `${text.position.y}px`,
//       left: `${text.position.x}px`,
//       fontSize: `${text.fontSize}px`,
//       fontFamily: text.font,
//       fontWeight: text.isBold ? "bold" : "normal",
//       fontStyle: text.isItalic ? "italic" : "normal",
//       backgroundColor: text.isHighlighted
//         ? `${text.highlightColor}${Math.round(
//             text.highlightOpacity * 255
//           ).toString(16)}`
//         : "transparent",
//       textAlign: "center",
//       pointerEvents: "none", // Disable pointer events so that clicks pass through the text overlay to the image
//     }}
//   >
//     {text.content}
//   </div>
// ))}
// {drawnArrows &&
//   drawnArrows.map((arrow, index) => {
//     // Calculate the angle of the arrow
//     const angle = Math.atan2(
//       arrow.end.y - arrow.start.y,
//       arrow.end.x - arrow.start.x
//     );
//     // Calculate the length of the arrowhead lines
//     const arrowheadLength = 10;
//     // Calculate the coordinates of the arrowhead
//     const arrowheadX1 =
//       arrow.end.x - arrowheadLength * Math.cos(angle - Math.PI / 6);
//     const arrowheadY1 =
//       arrow.end.y - arrowheadLength * Math.sin(angle - Math.PI / 6);
//     const arrowheadX2 =
//       arrow.end.x - arrowheadLength * Math.cos(angle + Math.PI / 6);
//     const arrowheadY2 =
//       arrow.end.y - arrowheadLength * Math.sin(angle + Math.PI / 6);

//     return (
//       <div
//         key={index}
//         className="drawn-arrow"
//         style={{
//           position: "absolute",
//           top: `${Math.min(arrow.start.y, arrow.end.y)}px`,
//           left: `${Math.min(arrow.start.x, arrow.end.x)}px`,
//         }}
//       >
//         <svg
//           width={`${Math.abs(arrow.end.x - arrow.start.x)}px`}
//           height={`${Math.abs(arrow.end.y - arrow.start.y)}px`}
//           viewBox={`0 0 ${Math.abs(
//             arrow.end.x - arrow.start.x
//           )} ${Math.abs(arrow.end.y - arrow.start.y)}`}
//         >
//           <line
//             x1={Math.abs(
//               arrow.start.x - Math.min(arrow.start.x, arrow.end.x)
//             )}
//             y1={Math.abs(
//               arrow.start.y - Math.min(arrow.start.y, arrow.end.y)
//             )}
//             x2={Math.abs(
//               arrow.end.x - Math.min(arrow.start.x, arrow.end.x)
//             )}
//             y2={Math.abs(
//               arrow.end.y - Math.min(arrow.start.y, arrow.end.y)
//             )}
//             style={{ stroke: arrow.color, strokeWidth: "4" }}
//           />
//           {/* Arrowhead */}
//           <line
//             x1={arrowheadX1 - Math.min(arrow.start.x, arrow.end.x)}
//             y1={arrowheadY1 - Math.min(arrow.start.y, arrow.end.y)}
//             x2={arrow.end.x - Math.min(arrow.start.x, arrow.end.x)}
//             y2={arrow.end.y - Math.min(arrow.start.y, arrow.end.y)}
//             style={{ stroke: arrow.color, strokeWidth: "2" }}
//           />
//           <line
//             x1={arrowheadX2 - Math.min(arrow.start.x, arrow.end.x)}
//             y1={arrowheadY2 - Math.min(arrow.start.y, arrow.end.y)}
//             x2={arrow.end.x - Math.min(arrow.start.x, arrow.end.x)}
//             y2={arrow.end.y - Math.min(arrow.start.y, arrow.end.y)}
//             style={{ stroke: arrow.color, strokeWidth: "2" }}
//           />
//         </svg>
//       </div>
//     );
//   })}
// {drawnLines &&
//   drawnLines.map((line, index) => (
//     <svg
//       key={index}
//       width={`${Math.abs(line.end.x - line.start.x)}px`}
//       height={`${Math.abs(line.end.y - line.start.y)}px`}
//       viewBox={`0 0 ${Math.abs(line.end.x - line.start.x)} ${Math.abs(
//         line.end.y - line.start.y
//       )}`}
//       style={{
//         position: "absolute",
//         top: `${Math.min(line.start.y, line.end.y)}px`,
//         left: `${Math.min(line.start.x, line.end.x)}px`,
//       }}
//     >
//       <line
//         x1={Math.abs(
//           line.start.x - Math.min(line.start.x, line.end.x)
//         )}
//         y1={Math.abs(
//           line.start.y - Math.min(line.start.y, line.end.y)
//         )}
//         x2={Math.abs(line.end.x - Math.min(line.start.x, line.end.x))}
//         y2={Math.abs(line.end.y - Math.min(line.start.y, line.end.y))}
//         style={{ stroke: line.color, strokeWidth: "4" }}
//       />
//     </svg>
//   ))}
// {drawnRectangles &&
//   drawnRectangles.map((rectangle, index) => {
//     return (
//       <svg
//         key={index}
//         width={`${Math.abs(rectangle.end.x - rectangle.start.x)}px`}
//         height={`${Math.abs(rectangle.end.y - rectangle.start.y)}px`}
//         viewBox={`0 0 ${Math.abs(
//           rectangle.end.x - rectangle.start.x
//         )} ${Math.abs(rectangle.end.y - rectangle.start.y)}`}
//         style={{
//           position: "absolute",
//           top: `${Math.min(rectangle.start.y, rectangle.end.y)}px`,
//           left: `${Math.min(rectangle.start.x, rectangle.end.x)}px`,
//         }}
//       >
//         <rect
//           x={Math.abs(
//             rectangle.start.x -
//               Math.min(rectangle.start.x, rectangle.end.x)
//           )}
//           y={Math.abs(
//             rectangle.start.y -
//               Math.min(rectangle.start.y, rectangle.end.y)
//           )}
//           width={Math.abs(rectangle.end.x - rectangle.start.x)}
//           height={Math.abs(rectangle.end.y - rectangle.start.y)}
//           style={{
//             stroke: rectangle.color,
//             strokeWidth: "4",
//             fill: "none",
//           }}
//         />
//       </svg>
//     );
//   })}

// {drawnOvals &&
//   drawnOvals.map((oval, index) => {
//     const centerX =
//       Math.min(oval.start.x, oval.end.x) +
//       Math.abs(oval.end.x - oval.start.x) / 2;
//     const centerY =
//       Math.min(oval.start.y, oval.end.y) +
//       Math.abs(oval.end.y - oval.start.y) / 2;
//     const radiusX = Math.abs(oval.end.x - oval.start.x) / 2;
//     const radiusY = Math.abs(oval.end.y - oval.start.y) / 2;

//     return (
//       <svg
//         key={index}
//         width={`${Math.abs(oval.end.x - oval.start.x)}px`}
//         height={`${Math.abs(oval.end.y - oval.start.y)}px`}
//         viewBox={`0 0 ${Math.abs(
//           oval.end.x - oval.start.x
//         )} ${Math.abs(oval.end.y - oval.start.y)}`}
//         style={{
//           position: "absolute",
//           top: `${Math.min(oval.start.y, oval.end.y)}px`,
//           left: `${Math.min(oval.start.x, oval.end.x)}px`,
//         }}
//       >
//         <ellipse
//           cx={radiusX}
//           cy={radiusY}
//           rx={radiusX}
//           ry={radiusY}
//           style={{
//             stroke: oval.color,
//             strokeWidth: "4",
//             fill: "none",
//           }}
//         />
//       </svg>
//     );
//   })}
//           {isOkClicked && uploadedPhoto && (
//             <Draggable
//               defaultPosition={{ x: position.x, y: position.y }}
//               onStop={(e, data) => setPosition({ x: data.x, y: data.y })}
//             >
//               <img
//                 src={uploadedPhoto}
//                 alt="Uploaded"
//                 className="Overlay-Image-overlay"
//                 style={{ transform: `rotate(${rotationAngles}deg)` }}
//               />
//             </Draggable>
//           )}
//         </div>

//         {isPopupOpen && (
//           <div className="Overlay-for-edit-images-tablist-section-main-container ">
//             <div className=" Overlay-for-edit-images-tablist-section-header-container">
//               <div>
//                 <p>Crop Image</p>
//               </div>
//               <div onClick={handleClosePopup}>
//                 <button className="OverlayImage-close-image-x">X</button>
//               </div>
//             </div>
//             <div className="paracontainer-para">
//               Click on move mouse to mark area.Click again to crop.Press Ok to
//               insert Image
//             </div>
//             <div className="button-continer-rotate-super-container">
//               <div className="Rotate-Button-to-rotate-Overlay-image-container">
//                 <button
//                   className="Rotate-Button-to-rotate-Overlay-image"
//                   onClick={handleSelectButtonClick}
//                 >
//                   Select
//                 </button>
//                 <button
//                   className="Rotate-Button-to-rotate-Overlay-image"
//                   onClick={handleRotateClockwise}
//                 >
//                   Rotate
//                 </button>
//               </div>
//               <div className="photo-container-photo-is-reviewed">
//                 {uploadedPhoto && (
//                   <img
//                     src={uploadedPhoto}
//                     alt="Uploaded"
//                     style={{ transform: `rotate(${rotationAngles}deg)` }}
//                     // className="photo-container-photo-is-reviewed"
//                   />
//                 )}
//               </div>
//             </div>
//             <div className="Buttons-to-add-overlay-image-ok-cancel-button">
//               <div
//                 className="ok-cancel-button-overlay-image"
//                 onClick={handleOkButton}
//               >
//                 <button>Ok</button>
//               </div>
//               <div
//                 className="ok-cancel-button-overlay-image"
//                 onClick={handleClosePopup}
//               >
//                 <button>Cancel</button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       <div className="Buttons-undo-redo-conatainer">
//         <button className="Buttons-undo-redo-yytytyt" onClick={handleUndo}>
//           Undo
//         </button>
//         <button className="Buttons-undo-redo-yytytyt" onClick={handleRedo}>
//           Redo
//         </button>
//       </div>
//       <input
//         ref={fileInputRef}
//         type="file"
//         accept="image/*"
//         style={{ display: "none" }}
//         onChange={handleFileUpload}
//       />
//     </>
//   );
// };

// export default OverLayImage;

import React, { useState, useRef, useEffect } from "react";
import "./OverLayImage.css";
import Draggable from "react-draggable";

const OverLayImage = ({
  imageUrl,
  textsWithPositions,
  drawnArrows,
  brightness,
  contrast,
  drawnLines,
  drawnOvals,
  drawnRectangles,
  croppedImageUrl,
  overLayImage,
  onOverlayChange,
  rotationAngle,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [overLay, setOverLay] = useState(overLayImage);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const fileInputRef = useRef(null);
  const [rotationAngles, setRotationAngle] = useState(0);
  const [imageSrc, setImageSrc] = useState("");
  const [isOkClicked, setIsOkClicked] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [combinedImageUrl, setCombinedImageUrl] = useState(null);

  useEffect(() => {
    if (overLayImage) {
      // If overLayImage is available, update the state
      setOverLay(overLayImage);
      // Optionally, update the parent component with the new overlay image URL
    }
  }, [overLayImage]); // Watch for changes in overLayImage

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
    // Create a temporary canvas to draw the combined image
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Define the maximum width and height
    const maxWidth = 776;
    const maxHeight = 576;

    // Load the original image
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      // Calculate the scaled dimensions while maintaining aspect ratio
      const scaleFactor = Math.min(
        maxWidth / img.width,
        maxHeight / img.height
      );
      const scaledWidth = img.width * scaleFactor;
      const scaledHeight = img.height * scaleFactor;

      // Set canvas dimensions to match the scaled image
      canvas.width = scaledWidth;
      canvas.height = scaledHeight;

      // Draw the original image onto the canvas
      context.drawImage(img, 0, 0, scaledWidth, scaledHeight);

      // Load the overlayed image
      const overlayImg = new Image();
      overlayImg.src = uploadedPhoto;
      overlayImg.onload = () => {
        // Draw the overlayed image onto the canvas at its current position
        context.drawImage(overlayImg, position.x, position.y);

        // Convert the canvas content to a data URL
        const downloadUrl = canvas.toDataURL("image/jpeg");

        // Call the onOverlayChange function to store the combined image URL in the parent component
        onOverlayChange(downloadUrl);

        // Create a temporary link element to trigger download
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "combined_image.jpg";
        link.click();

        // Clean up
        URL.revokeObjectURL(downloadUrl);
      };
    };
  };

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
          {/* {textsWithPositions.map((text) => (
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
          {/* <line
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
            })} */}{" "}
          */
          {isOkClicked && uploadedPhoto && (
            <Draggable
              defaultPosition={{ x: position.x, y: position.y }}
              onStop={(e, data) => setPosition({ x: data.x, y: data.y })}
            >
              <img
                src={uploadedPhoto}
                alt="Uploaded"
                className="Overlay-Image-overlay"
                style={{ transform: `rotate(${rotationAngles}deg)` }}
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
                    // className="photo-container-photo-is-reviewed"
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
      <div className="Download-button-container">
        <button className="Download-button" onClick={handleDownload}>
          Download
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
};

export default OverLayImage;
