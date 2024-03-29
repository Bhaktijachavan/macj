import React, { useState, useRef, useEffect } from "react";
import "./Editor.css";


const Editor = ({
  imageUrl,
  croppedImageUrl,
  textsWithPositions,
  onTextChange,
  drawnArrows,
  brightness,
  contrast,
  drawnLines,
  drawnOvals,
  drawnRectangles,
  rotationAngle,
}) => {
  const [font, setFont] = useState("Arial");
  const [fontSize, setFontSize] = useState(16);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [textColor, setTextColor] = useState("#000000");
  const [highlightColor, setHighlightColor] = useState("#FFFF00");
  const [highlightOpacity, setHighlightOpacity] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [text, setText] = useState("");
  const [texts, setTexts] = useState(textsWithPositions);

  const [historyIndex, setHistoryIndex] = useState(-1);
  const [history, setHistory] = useState([]); // Maintain a history of text changes

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

  const handleAddText = () => {
    // Create a new text object and add it to the texts array
    const newText = {
      id: Date.now(), // Generate a unique id
      content: text,
      position: { x: clickPosition.x, y: clickPosition.y }, // Use the click position
      font,
      fontSize,
      isBold,
      isItalic,
      isHighlighted,
      textColor,
      highlightColor,
      highlightOpacity,
    };
    setTexts((prevTexts) => [...prevTexts, newText]); // Add the new text to the texts state
    onTextChange([...textsWithPositions, newText]);

    setText(""); // Clear the text input
    setIsPopupOpen(false); // Close the popup
    setHistory((prevHistory) => [
      ...prevHistory.slice(0, historyIndex + 1),
      texts,
    ]);
    setHistoryIndex(historyIndex + 1);
    setText("");
    setIsPopupOpen(false); // Close the popup
  };

  useEffect(() => {
    if (croppedImageUrl) {
      setImageSrc(croppedImageUrl);
    } else {
      setImageSrc(imageUrl); // Set to original image URL
    }
  }, [croppedImageUrl, imageUrl]);

  const handleFontChange = (event) => {
    setFont(event.target.value);
  };

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
  };

  const handleBoldChange = () => {
    setIsBold(!isBold);
  };

  const handleItalicChange = () => {
    setIsItalic(!isItalic);
  };

  const handleHighlightChange = () => {
    setIsHighlighted(!isHighlighted);
  };

  const handleTextColorChange = (event) => {
    setTextColor(event.target.value);
  };

  const handleHighlightColorChange = (event) => {
    setHighlightColor(event.target.value);
  };

  const handleHighlightOpacityChange = (event) => {
    setHighlightOpacity(event.target.value);
  };

  const handleImageClick = (event) => {
    // Get the clicked position relative to the image
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setClickPosition({ x, y });
    setIsPopupOpen(true); // Open the popup box
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // Function to handle undo operation
  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1); // Decrement history index
      setTexts(history[historyIndex - 1]); // Set texts state to the previous state in history
    }
  };

  // Function to handle redo operation
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1); // Increment history index
      setTexts(history[historyIndex + 1]); // Set texts state to the next state in history
    }
  };

  // Effect to update history when texts change
  useEffect(() => {
    if (texts !== history[historyIndex]) {
      setHistory((prevHistory) => [
        ...prevHistory.slice(0, historyIndex + 1),
        texts,
      ]);
      setHistoryIndex(historyIndex + 1);
    }
  }, [texts]);

  return (
    <>
      <div className="Editor-image-main-container-to-add-text">
        <div
          className="Editor-image-container-to-add-text"
          style={{
            filter: `contrast(${contrast}%) brightness(${brightness}%) `,
            transform: `rotate(${rotationAngle}deg)`,
          }}
        >
          <img
            src={imageSrc}
            alt="Original Image"
            className="Editor-image-to-add-text"
            onClick={handleImageClick} // Attach click event listener to the image
          />

          {texts.map((text) => (
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
      <div className="information-to-know-what-to-do">
        <p>Click on any position on the image to add text on position.</p>
      </div>
      <div className="Buttons-undo-redo-conatainer">
        <button className="Buttons-undo-redo-yytytyt" onClick={handleUndo}>
          Undo
        </button>
        <button className="Buttons-undo-redo-yytytyt" onClick={handleRedo}>
          Redo
        </button>
      </div>

      {isPopupOpen && (
        <div className="editor-for-edit-images-tablist-section ">
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "57.6%",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "28em",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="flex justify-between px-3 editor-heading-close">
                <div>
                  <p>Add Text</p>
                </div>
                <div
                  className="hover:bg-red-600 px-2 cursor-pointer"
                  onClick={handleClosePopup}
                >
                  <button>X</button>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  borderBottom: "1px solid #ccc",
                  backgroundColor: "#E5E5E5",
                }}
              >
                <div style={{ flex: 1, padding: "30px" }}>
                  <label>Font:</label>
                  <select
                    value={font}
                    onChange={handleFontChange}
                    className="border mb-3"
                  >
                    <option value="Arial">Arial</option>
                    <option value="Arial, Helvetica, sans-serif">
                      Helvetica
                    </option>
                    <option value="'Times New Roman', Times, serif">
                      Times New Roman
                    </option>
                    <option value="Verdana, Geneva, sans-serif">Verdana</option>
                    <option value="'Courier New', Courier, monospace">
                      Courier New
                    </option>
                    <option value="'Lucida Console', Monaco, monospace">
                      Lucida Console
                    </option>
                    <option value="'Garamond', serif">Garamond</option>
                    <option value="'Palatino Linotype', 'Book Antiqua', Palatino, serif">
                      Palatino
                    </option>
                    <option value="'Trebuchet MS', sans-serif">
                      Trebuchet MS
                    </option>
                    <option value="'Georgia', serif">Georgia</option>
                    {/* Add more fonts as needed */}
                  </select>

                  <label className="">Font Size:</label>
                  <input
                    type="number"
                    value={fontSize}
                    onChange={handleFontSizeChange}
                    className="border"
                  />
                </div>
                <div style={{ padding: "10px" }}>
                  <div>
                    <input
                      type="checkbox"
                      checked={isBold}
                      onChange={handleBoldChange}
                    />
                    <label className="px-3">Bold</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      checked={isItalic}
                      onChange={handleItalicChange}
                    />
                    <label className="px-3">Italic</label>
                  </div>
                  <div className="mb-1">
                    <input
                      type="checkbox"
                      checked={isHighlighted}
                      onChange={handleHighlightChange}
                    />
                    <label className="px-3">Highlight</label>
                  </div>

                  <div className="mb-1">
                    <input
                      type="color"
                      value={textColor}
                      onChange={handleTextColorChange}
                    />
                    <label>Text Color</label>
                  </div>
                  <div className="mb-1">
                    <input
                      type="color"
                      value={highlightColor}
                      onChange={handleHighlightColorChange}
                    />
                    <label>Highlight Color</label>
                  </div>
                  <div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={highlightOpacity}
                      onChange={handleHighlightOpacityChange}
                      className="w-24"
                    />
                    <label>Highlight Opacity</label>
                  </div>
                </div>
              </div>

              <div
                style={{
                  flex: 1,
                  padding: "10px",
                  height: "90%",
                  backgroundColor: "white",
                }}
              >
                <textarea
                  style={{
                    fontFamily: font,
                    fontSize: `${fontSize}px`,
                    fontWeight: isBold ? "bold" : "normal",
                    fontStyle: isItalic ? "italic" : "normal",
                    backgroundColor: isHighlighted
                      ? `${highlightColor}${Math.round(
                          highlightOpacity * 255
                        ).toString(16)}`
                      : "transparent",
                    color: textColor,
                    width: "412px",
                    height: "135px",
                    boxSizing: "border-box",
                  }}
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                />
              </div>
              <div className=" flex justify-center gap-5 py-2 bg-gray-200">
                <div>
                  <button
                    className="button-for-editor px-2"
                    onClick={handleAddText}
                  >
                    Ok
                  </button>
                </div>
                <div>
                  <button
                    className="button-for-editor px-2"
                    onClick={handleClosePopup}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Editor;
