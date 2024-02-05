import React, { useState } from "react";
import "./Editor.css";
const Editor = ({ imageUrl }) => {
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
  return (
    <>
      <div className="Editor-image-container-to-add-text">
        <img
          src={imageUrl}
          alt="Original Image"
          className="Editor-image-to-add-text"
        />
        {isPopupOpen && (
          <div className="editor-for-edit-images-tablist-section ">
            <div
              // style={{
              //   display: "flex",
              //   height: "100%",
              //   alignItems: "center",
              //   justifyContent: "center",
              //   width: "60%",
              //   backgroundColor: "#F2F1EC",
              // }}
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
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>
                <div className=" flex justify-center gap-5 py-2 bg-gray-200">
                  <div>
                    <button className="button-for-editor px-2">Ok</button>
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
    </>
  );
};

export default Editor;
