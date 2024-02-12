import React, { useState, useRef } from "react";
import "./Editor.css";
import Draggable from "react-draggable";
const Editor = ({
  imageUrl,
  onTextChange,
  drawnArrows,
  brightness,
  contrast,
  drawnLines,
}) => {
  const [font, setFont] = useState("Arial");
  const [fontSize, setFontSize] = useState(16);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [textColor, setTextColor] = useState("#000000");
  const [highlightColor, setHighlightColor] = useState("#FFFF00");
  const [highlightOpacity, setHighlightOpacity] = useState(1);
  const [text, setText] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [texts, setTexts] = useState([]);
  const changesHistory = useRef([]);
  const historyIndex = useRef(-1);

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

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  const handleDragStop = (e, data, id) => {
    // Update the position of the text when dragging stops
    setTexts((prevTexts) => {
      return prevTexts.map((t) =>
        t.id === id ? { ...t, position: { x: data.x, y: data.y } } : t
      );
    });
  };

  const handleAddText = () => {
    // Create a new text object and add it to the texts array
    const newText = {
      id: texts.length + 1,
      content: text,
      position: { x: 20, y: 20 }, // Initial position
      // ... (other styling properties)
      font,
      fontSize,
      isBold,
      isItalic,
      isHighlighted,
      textColor,
      highlightColor,
      highlightOpacity,
    };

    setTexts([...texts, newText]);
    setText(""); // Clear the textarea after adding text
    changesHistory.current.splice(historyIndex.current + 1);
    changesHistory.current.push([...texts]);
    historyIndex.current++;
    onTextChange([...texts, newText]);
  };
  const undo = () => {
    if (historyIndex.current > 0) {
      historyIndex.current--;
      setTexts(changesHistory.current[historyIndex.current]);
    }
  };

  const redo = () => {
    if (historyIndex.current < changesHistory.current.length - 1) {
      historyIndex.current++;
      setTexts(changesHistory.current[historyIndex.current]);
    }
  };

  return (
    <>
      <div className="Editor-image-container-to-add-text">
        <img
          src={imageUrl}
          alt="Original Image"
          className="Editor-image-to-add-text"
          style={{
            filter: `brightness(${brightness}%) contrast(${contrast}%)`,
          }}
        />
        {texts.map((t) => (
          <Draggable
            key={t.id}
            defaultPosition={{ x: t.position.x, y: t.position.y }}
            onStop={handleDragStop}
          >
            <div
              className="text-overlay"
              style={{
                color: t.textColor,
                position: "absolute",
                top: `${t.position.y}%`,
                left: `${t.position.x}%`,
                fontSize: `${t.fontSize}px`,
                fontFamily: t.font,
                fontWeight: t.isBold ? "bold" : "normal",
                fontStyle: t.isItalic ? "italic" : "normal",
                backgroundColor: t.isHighlighted
                  ? `${t.highlightColor}${Math.round(
                      t.highlightOpacity * 255
                    ).toString(16)}`
                  : "transparent",
                textAlign: "center",
                cursor: "move",
              }}
            >
              {t.content}
            </div>
          </Draggable>
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

        {isPopupOpen && (
          <div className="editor-for-edit-images-tablist-section ">
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
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
                      <option value="Verdana, Geneva, sans-serif">
                        Verdana
                      </option>
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

export default Editor;
